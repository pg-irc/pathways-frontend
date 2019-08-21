import * as R from 'ramda';
import * as constants from '../../application/constants';
import {
    Id, Service, ServiceStore, ServiceMap, ValidServicesForTopic,
    PhoneNumber, ValidatedPhoneNumberJSON, ValidatedServiceAtLocationJSON,
    ValidatedAddressWithTypeJSON, Address,
} from './types';
import { BuildTopicServicesRequestAction, BuildTopicServicesSuccessAction, BuildTopicServicesErrorAction, ServicesAction } from './actions';

export { Id, ServiceStore };

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
        organizationName: data.service.organization_name,
    };
}

export function buildDefaultStore(): ServiceStore {
    return {
        services: {},
        servicesByTopic: {},
    };
}

export const buildEmptyServicesForTopic = (): ValidServicesForTopic => ({
    serviceIds: [],
    type: constants.TOPIC_SERVICES_VALID,
});

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

const updateServicesRequest = (store: ServiceStore, action: BuildTopicServicesRequestAction): ServiceStore => {
    const topicId = action.payload.topicId;
    return {
        ...store,
        servicesByTopic: {
            ...store.servicesByTopic,
            [topicId]: {
                type: constants.TOPIC_SERVICES_LOADING,
            },
        },
    };
};

const updateServicesSuccess = (store: ServiceStore, action: BuildTopicServicesSuccessAction): ServiceStore => {
    const newServices = action.payload.services;
    const topicId = action.payload.topicId;
    const newServicesAsMap = createServiceMap(newServices);
    const newServiceIds = R.map((service: Service): string => service.id, newServices);
    return {
        ...store,
        services: {
            ...store.services,
            ...newServicesAsMap,
        },
        servicesByTopic: {
            ...store.servicesByTopic,
            [topicId]: {
                type: constants.TOPIC_SERVICES_VALID,
                serviceIds: newServiceIds,
            },
        },
    };
};

const updateServicesFailure = (store: ServiceStore, action: BuildTopicServicesErrorAction): ServiceStore => {
    const topicId = action.payload.topicId;
    const errorMessageType = action.payload.errorMessageType;
    return {
        ...store,
        servicesByTopic: {
            ...store.servicesByTopic,
            [topicId]: {
                type: constants.TOPIC_SERVICES_ERROR,
                errorMessageType,
            },
        },
    };
};

const createServiceMap = (services: ReadonlyArray<Service>): ServiceMap => {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
};
