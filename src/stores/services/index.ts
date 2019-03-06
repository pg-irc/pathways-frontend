import * as R from 'ramda';
import * as constants from '../../application/constants';
import {
    Id, Service, ServiceStore, ServiceMap, TaskServices,
    PhoneNumber, TaskServicesError, ErrorMessageType,
} from './types';
import {
    SendTaskServicesRequestAction, sendTaskServicesRequest, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
    ServicesAction,
} from './actions';
import {
    ValidatedPhoneNumberJSON, ValidatedServiceAtLocationJSON,
    ValidatedAddressWithTypeJSON, Address,
} from './types';
import { serviceAtLocation, serviceAtLocationArray } from './schemas';
import { isTaskServices } from './is_task_services';

export {
    Id, Service, ServiceStore, PhoneNumber, Address, TaskServicesError,
    ErrorMessageType, TaskServices, ServiceMap,
};
export {
    SendTaskServicesRequestAction, sendTaskServicesRequest, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
};
export { serviceAtLocation, serviceAtLocationArray };
export { isTaskServices };

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
        services: {},
        taskServicesOrError: {},
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
    const taskServicesOrError = store.taskServicesOrError[taskId] || buildDefaultTaskServices();
    return {
        ...store,
        taskServicesOrError: {
            ...store.taskServicesOrError,
            [taskId]: { ...taskServicesOrError, loading: true },
        },
    };
}

function updateServicesSuccess(store: ServiceStore, action: PopulateTaskServicesFromSuccessAction): ServiceStore {
    const services = action.payload.services;
    const taskId = action.payload.taskId;
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServices = {
        [taskId]: {
            ...store.taskServicesOrError[taskId],
            loading: false,
            serviceIds,
        },
    };
    return {
        ...store,
        services: { ...store.services, ...serviceMap },
        taskServicesOrError: { ...store.taskServicesOrError, ...taskServices },
    };
}

function updateServicesFailure(store: ServiceStore, action: PopulateTaskServicesFromErrorAction): ServiceStore {
    const taskId = action.payload.taskId;
    const errorMessage = action.payload.errorMessage;
    const errorMessageType = action.payload.errorMessageType;
    const error = {
        [taskId]: {
            loading: false,
            errorMessageType,
            errorMessage,
        },
    };
    return {
        ...store,
        taskServicesOrError: { ...store.taskServicesOrError, ...error },
    };
}

const createServiceMap = (services: ReadonlyArray<Service>): ServiceMap => {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
};
