import * as R from 'ramda';
import * as constants from '../../application/constants';
import { Id, Service, ServiceStore, ServiceMap, TaskServices, PhoneNumber } from './types';
import { UpdateTaskServicesAsync, updateTaskServicesAsync } from './update_task_services';
import { Action } from 'redux';
import { ValidatedPhoneNumberJSON, ValidatedServiceAtLocationJSON, ValidatedAddressJSON, FullAddress } from './types';
import { serviceAtLocation, serviceAtLocationArray } from './schemas';

export { Id, Service, ServiceStore, PhoneNumber, FullAddress };
export { UpdateTaskServicesAsync, updateTaskServicesAsync };
export { serviceAtLocation, serviceAtLocationArray };

export function serviceFromValidatedJSON(data: ValidatedServiceAtLocationJSON): Service {
    const phoneNumbers = R.map((phoneNumber: ValidatedPhoneNumberJSON): PhoneNumber => ({
         type: phoneNumber.phone_number_type,
         phoneNumber: phoneNumber.phone_number,
     }), data.location.phone_numbers);

    const fullAddresses = R.map((address: ValidatedAddressJSON): FullAddress => ({
        type: address.address_type,
        address: address.address,
    }), data.location.addresses);

    const ADDRESS_TYPE_PHYSICAL = "physical_address";
    var addressValue: FullAddress = null;
    for (let index = 0; index < fullAddresses.length; index++) {
        const element = fullAddresses[index];
        if (element.type.match(ADDRESS_TYPE_PHYSICAL)) {
            addressValue = element;
        }
    }

    return {
        id: data.service.id,
        name: data.service.name,
        description: data.service.description,
        phoneNumbers: phoneNumbers,
        fullAddresses: addressValue,
    };
}

function buildDefaultStore(): ServiceStore {
    return {
        serviceMap: {},
        taskServicesMap: {},
    };
}

export function buildDefaultTaskServices(): TaskServices {
    return {
        loading: false,
        message: '',
        serviceIds: [],
    };
}

export function reducer(store: ServiceStore = buildDefaultStore(), action: Action): ServiceStore {
    switch (action.type) {
        case constants.LOAD_SERVICES_REQUEST:
            return updateServicesRequest(store, action as UpdateTaskServicesAsync.Request);
        case constants.LOAD_SERVICES_SUCCESS:
            return updateServicesSuccess(store, action as UpdateTaskServicesAsync.Success);
        case constants.LOAD_SERVICES_FAILURE:
            return updateServicesFailure(store, action as UpdateTaskServicesAsync.Failure);
        default:
            return store;
    }
}

function updateServicesRequest(store: ServiceStore, action: UpdateTaskServicesAsync.Request): ServiceStore {
    const taskId = action.payload.taskId;
    const taskServices = store.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...taskServices, message: '', loading: true },
        },
    };
}

function updateServicesSuccess(store: ServiceStore, action: UpdateTaskServicesAsync.Success): ServiceStore {
    const services = action.payload.services;
    const taskId = action.payload.taskId;
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServicesMap = { [taskId]: { ...store.taskServicesMap[taskId], serviceIds, loading: false } };
    return {
        ...store,
        serviceMap: { ...store.serviceMap, ...serviceMap },
        taskServicesMap: { ...store.taskServicesMap, ...taskServicesMap },
    };
}

function updateServicesFailure(store: ServiceStore, action: UpdateTaskServicesAsync.Failure): ServiceStore {
    const taskId = action.payload.taskId;
    const message = action.payload.message;
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...store.taskServicesMap[taskId], message, loading: false },
        },
    };
}

function createServiceMap(services: ReadonlyArray<Service>): ServiceMap {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
}
