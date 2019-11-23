import * as R from 'ramda';
import * as constants from '../../application/constants';
import * as actions from './actions';
import * as types from '../../validation/services/types';
import { Id, ServiceStore } from '../../validation/services/types';
import { UserDataPersistence } from '../user_data';
export { Id, ServiceStore };

export function buildDefaultStore(): types.ServiceStore {
    return {
        services: {},
        servicesByTopic: {},
        savedServices: [],
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
        case constants.ADD_SERVICE_BOOKMARK:
            return addToSavedServicesList(store, action);
        case constants.REMOVE_SERVICE_BOOKMARK:
            return removeFromSavedServicesList(store, action);
        case constants.CLEAR_ALL_USER_DATA:
            return clearServicesData(store);
        case constants.LOAD_USER_DATA_FAILURE:
        return {
            ...store,
        };
        case constants.LOAD_USER_DATA_REQUEST:
            return {
                ...store,
            };
        case constants.LOAD_USER_DATA_SUCCESS:
            return loadServicesFromUserData(store, action);
        default:
            return store;
    }
}

const updateServicesRequest = (store: types.ServiceStore, action: actions.BuildServicesRequestAction): types.ServiceStore => {
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

const updateServicesSuccess = (store: types.ServiceStore, action: actions.BuildServicesSuccessAction): types.ServiceStore => {
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

const updateServicesFailure = (store: types.ServiceStore, action: actions.BuildServicesErrorAction): types.ServiceStore => {
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

const addToSavedServicesList = (store: types.ServiceStore, action: actions.AddServiceToSavedListAction): types.ServiceStore => {
    const service = action.payload.service;
    const serviceId = service.id;
    return {
        ...store,
        services: {
            ...store.services,
            service,
        },
        savedServices: [...store.savedServices, serviceId],
    };
} ;

const removeFromSavedServicesList = (store: types.ServiceStore, action: actions.RemoveServiceFromSavedListAction): types.ServiceStore => {
    const serviceIdToRemove = action.payload.service.id;
    const updatedSavedServicesList = store.savedServices.filter((id: Id) => id !== serviceIdToRemove);
    return {
        ...store,
        savedServices: updatedSavedServicesList,
    };
};

const clearServicesData = (store: types.ServiceStore): types.ServiceStore => (
    {
        ...store,
        services: {},
        savedServices: [],
    }
);

const loadServicesFromUserData = (store: types.ServiceStore, action: UserDataPersistence.LoadSuccessAction): types. ServiceStore => {
    const persistedServices: types.ServiceMap = action.payload.savedServices;
    const persistedServicesIds: types.ServiceList = Object.keys(persistedServices);
    return {
        ...store,
        services: {
            ...store.services,
            ...persistedServices,
        },
        savedServices: [
            ...store.savedServices,
            ...persistedServicesIds,
        ],
    };
};