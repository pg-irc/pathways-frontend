import * as R from 'ramda';
import * as constants from '../../application/constants';
import * as actions from './actions';
import * as types from '../../validation/services/types';

import { Id, ServiceStore } from '../../validation/services/types';
export { Id, ServiceStore };

export function buildDefaultStore(): types.ServiceStore {
    return {
        services: {},
        servicesByTopic: {},
    };
}

export const buildEmptyServicesForTopic = (): types.ValidServicesForTopic => ({
    serviceIds: [],
    type: constants.TOPIC_SERVICES_VALID,
});

export function reducer(store: types.ServiceStore = buildDefaultStore(), action?: actions.ServicesAction): types.ServiceStore {
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

const updateServicesRequest = (store: types.ServiceStore, action: actions.BuildTopicServicesRequestAction): types.ServiceStore => {
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

const updateServicesSuccess = (store: types.ServiceStore, action: actions.BuildTopicServicesSuccessAction): types.ServiceStore => {
    const newServices = action.payload.services;
    const topicId = action.payload.topicId;
    const newServicesAsMap = createServiceMap(newServices);
    const newServiceIds = R.map((service: types.HumanServiceData): string => service.id, newServices);
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

const updateServicesFailure = (store: types.ServiceStore, action: actions.BuildTopicServicesErrorAction): types.ServiceStore => {
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

const createServiceMap = (services: ReadonlyArray<types.HumanServiceData>): types.ServiceMap => {
    const theReducer = (serviceMap: types.ServiceMap, service: types.HumanServiceData): types.ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
};
