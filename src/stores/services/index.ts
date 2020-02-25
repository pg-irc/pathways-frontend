import * as R from 'ramda';
import * as constants from '../../application/constants';
import * as actions from './actions';
import * as types from '../../validation/services/types';
import { Id, ServiceStore } from '../../validation/services/types';
import { DataPersistence } from '../persisted_data';
export { Id, ServiceStore };

export type ServiceBookmarkActions = actions.BookmarkServiceAction | actions.UnbookmarkServiceAction;

export function buildDefaultStore(): types.ServiceStore {
    return {
        services: {},
        servicesByTopic: {},
        serviceFeedbackEnabled: false,
        discardFeedbackModalIsVisible: false,
    };
}

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
        case constants.SAVE_SERVICE:
            return saveService(store, action);
        case constants.BOOKMARK_SERVICE:
            return updateServiceBookmarkInServicesMap(store, action, true);
        case constants.UNBOOKMARK_SERVICE:
            return updateServiceBookmarkInServicesMap(store, action, false);
        case constants.CLEAR_ALL_USER_DATA:
            return clearServicesData(store);
        case constants.LOAD_USER_DATA_SUCCESS:
            return loadServicesFromUserData(store, action);
        case constants.ENABLE_SERVICE_FEEDBACK:
            return updateServiceFeedback(store, true);
        case constants.DISABLE_SERVICE_FEEDBACK:
            return updateServiceFeedback(store, false);
        case constants.OPEN_DISCARD_FEEDBACK_MODAL:
            return updateDiscardFeedbackIsVisible(store, true);
        case constants.CLOSE_DISCARD_FEEDBACK_MODAL:
            return updateDiscardFeedbackIsVisible(store, false);
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
                type: constants.LOADING_SERVICES_FOR_TOPIC,
            },
        },
    };
};

const updateServicesSuccess = (store: types.ServiceStore, action: actions.BuildServicesSuccessAction): types.ServiceStore => {
    const newServices = action.payload.services;
    const topicId = action.payload.topicId;
    const newServicesAsMap = createServiceMap(newServices);
    const newServiceIds = R.map((service: types.HumanServiceData): string => service.id, newServices);
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + twentyFourHoursInMilliseconds;
    return {
        ...store,
        services: {
            ...store.services,
            ...newServicesAsMap,
        },
        servicesByTopic: {
            ...store.servicesByTopic,
            [topicId]: {
                type: constants.VALID_SERVICES_FOR_TOPIC,
                serviceIds: newServiceIds,
                expiresAt,
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
                type: constants.ERROR_SERVICES_FOR_TOPIC,
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

const saveService = (store: types.ServiceStore, action: actions.SaveServiceAction): types.ServiceStore => ({
    ...store,
    services: {
        ...store.services,
        [action.payload.service.id]: action.payload.service,
    },
});

const updateServiceBookmarkInServicesMap = (store: types.ServiceStore, action: ServiceBookmarkActions,
    bookmarkedState: boolean): types.ServiceStore => {
    const serviceId = action.payload.service.id;
    return {
        ...store,
        services: {
            ...store.services,
            [serviceId]: {
                ...action.payload.service,
                bookmarked: bookmarkedState,
            },
        },
    };
};

const clearServicesData = (store: types.ServiceStore): types.ServiceStore => (
    {
        ...store,
        services: {},
        serviceFeedbackEnabled: false,
    }
);

const loadServicesFromUserData = (store: types.ServiceStore, action: DataPersistence.LoadSuccessAction): types.ServiceStore => {
    return {
        ...store,
        services: {
            ...store.services,
            ...action.payload.bookmarkedServices,
        },
    };
};

const updateServiceFeedback = (store: types.ServiceStore, feedbackState: boolean): types.ServiceStore => ({
    ...store,
    serviceFeedbackEnabled: feedbackState,
});

const updateDiscardFeedbackIsVisible = (store: types.ServiceStore, isVisible: boolean): types.ServiceStore => ({
    ...store,
    discardFeedbackModalIsVisible: isVisible,
});