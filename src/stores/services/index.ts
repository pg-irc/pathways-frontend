import * as R from 'ramda';
import * as constants from '../../application/constants';
import {
    Id, Service, ServiceStore, ServiceMap, TaskServices,
    PhoneNumber, TaskServicesErrorsMap, TaskServicesError,
} from './types';
import {
    SendTaskServicesRequestAction, sendTaskServicesRequest, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
    ErrorMessageType,
    ServicesAction,
} from './actions';
import { ValidatedPhoneNumberJSON, ValidatedServiceAtLocationJSON, ValidatedAddressWithTypeJSON, Address } from './types';
import { serviceAtLocation, serviceAtLocationArray } from './schemas';

export { Id, Service, ServiceStore, PhoneNumber, Address, TaskServicesErrorsMap, TaskServicesError };
export {
    SendTaskServicesRequestAction, sendTaskServicesRequest, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
    ErrorMessageType,
};
export { serviceAtLocation, serviceAtLocationArray };

export function serviceFromValidatedJSON(data: ValidatedServiceAtLocationJSON): Service {
    const phoneNumbers = R.map((phoneNumber: ValidatedPhoneNumberJSON): PhoneNumber => ({
        type: phoneNumber.phone_number_type,
        phoneNumber: phoneNumber.phone_number,
    }), data.location.phone_numbers);

    const addresses = R.map((addressWithType: ValidatedAddressWithTypeJSON): Address => ({
        id: addressWithType.address.id,
        type: addressWithType.address_type,
        address: addressWithType.address.address,
        city: addressWithType.address.city,
        stateProvince: addressWithType.address.state_province,
        postalCode: addressWithType.address.postal_code,
        country: addressWithType.address.country,
    }), data.location.addresses);

    return {
        id: data.service.id,
        // These values come in the wrong order from the server
        latitude: data.location.longitude,
        longitude: data.location.latitude,
        name: data.service.name,
        description: data.service.description,
        phoneNumbers: phoneNumbers,
        addresses: addresses,
        website: data.service.organization_url,
        email: data.service.organization_email,
    };
}

export function buildDefaultStore(): ServiceStore {
    return {
        serviceMap: {},
        taskServicesMap: {},
        taskServicesErrors: {},
    };
}

export function buildDefaultTaskServices(): TaskServices {
    return {
        loading: false,
        serviceIds: [],
    };
}

export function reducer(store: ServiceStore = buildDefaultStore(), action?: ServicesAction): ServiceStore {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_SERVICES_REQUEST:
            return updateServicesRequest(store, action);
        case constants.LOAD_SERVICES_SUCCESS:
            return updateServicesSuccess(store, action);
        case constants.LOAD_SERVICES_FAILURE:
            return updateServicesFailure(store, action);
        default:
            return store;
    }
}

function updateServicesRequest(store: ServiceStore, action: SendTaskServicesRequestAction): ServiceStore {
    const taskId = action.payload.taskId;
    const taskServices = store.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...taskServices, loading: true },
        },
        taskServicesErrors: buildErrorsWithoutTask(taskId, store.taskServicesErrors),
    };
}

function updateServicesSuccess(store: ServiceStore, action: PopulateTaskServicesFromSuccessAction): ServiceStore {
    const services = action.payload.services;
    const taskId = action.payload.taskId;
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServicesMap = { [taskId]: { ...store.taskServicesMap[taskId], serviceIds, loading: false } };
    return {
        ...store,
        serviceMap: { ...store.serviceMap, ...serviceMap },
        taskServicesMap: { ...store.taskServicesMap, ...taskServicesMap },
        taskServicesErrors: buildErrorsWithoutTask(taskId, store.taskServicesErrors),
    };
}

function updateServicesFailure(store: ServiceStore, action: PopulateTaskServicesFromErrorAction): ServiceStore {
    const taskId = action.payload.taskId;
    const errorMessage = action.payload.errorMessage;
    const errorMessageType = action.payload.errorMessageType;
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...store.taskServicesMap[taskId], loading: false },
        },
        taskServicesErrors: {
            ...store.taskServicesErrors,
            [taskId]: { taskId, errorMessage, errorMessageType },
        },
    };
}

function createServiceMap(services: ReadonlyArray<Service>): ServiceMap {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
}

const buildErrorsWithoutTask = (taskId: Id, taskServicesErrors: TaskServicesErrorsMap): TaskServicesErrorsMap => (
    R.reject(R.propEq('taskId', taskId), taskServicesErrors)
);
