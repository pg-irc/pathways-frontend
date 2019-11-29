// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import { reducer } from '../services';
import { isValidServicesForTopic } from '../services/is_valid_services_for_topic';
import {
    BuildServicesRequestAction, BuildServicesSuccessAction,
    BuildServicesErrorAction,
    AddServiceToSavedListAction,
    RemoveServiceFromSavedListAction,
} from '../services/actions';
import { HumanServiceData, ServiceStore, ServiceListData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';
import { TopicBuilder } from './helpers/topics_helpers';
import { aString } from '../../helpers/random_test_values';
import { ServiceBuilder, buildNormalizedServices, TaskServicesBuilder, TaskServicesErrorBuilder, buildServiceMap } from './helpers/services_helpers';
import { isServiceLoading } from '../../validation/services/types';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { UserDataPersistence } from '../user_data';

describe('services reducer', () => {
    const aService = new ServiceBuilder();
    const loadedTaskServices = new TaskServicesBuilder().withServiceIds([aService.id]);
    const loadingTaskServices = new TaskServicesBuilder().withLoading(true);
    const loadedTaskServicesError = new TaskServicesErrorBuilder();
    const loadingTaskServicesError = new TaskServicesErrorBuilder().withLoading(true);
    const theStore = buildNormalizedServices(
        [aService],
        [loadedTaskServices, loadingTaskServices, loadedTaskServicesError, loadingTaskServicesError],
    );

    it('returns a unmodified store when the action is missing', () => {
        expect(reducer(theStore)).toBe(theStore);
    });

    describe('when sending a topic services request', () => {

        it('creates loading topic services object', () => {
            const topicId = aString();
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServicesOrError = store.servicesByTopic[topicId];
            expect(topicServicesOrError).toEqual({ type: constants.TOPIC_SERVICES_LOADING });
        });

        it('sets state of the topic service to loading', () => {
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedTaskServices.topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServices = store.servicesByTopic[loadedTaskServices.topicId];
            expect(isServiceLoading(topicServices)).toBe(true);
        });

        it('sets loading to true on pre existing topic services error objects', () => {
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedTaskServicesError.topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServicesError = store.servicesByTopic[loadedTaskServicesError.topicId];
            expect(isServiceLoading(topicServicesError)).toBe(true);
        });

        it('does not update existing services', () => {
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: aString(), manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            expect(store.services).toEqual(theStore.services);
        });
    });

    describe('when populating topic services objects from a success response', () => {
        const topic = new TopicBuilder().withId(loadingTaskServices.topicId).build();
        const services: ServiceListData = [new ServiceBuilder().build(), new ServiceBuilder().build()];
        const action: BuildServicesSuccessAction = {
            type: constants.LOAD_SERVICES_SUCCESS,
            payload: {
                topicId: topic.id,
                services,
            },
        };
        const store = reducer(theStore, action);
        const topicServicesOrErrorEntry = store.servicesByTopic[topic.id];

        it('updates services', () => {
            const serviceMap = store.services;
            services.forEach((service: HumanServiceData) => {
                expect(serviceMap[service.id]).toBe(service);
            });
        });

        it('maintains the ordering of the services in the topics service vector', () => {
            const servicesWithIds: ServiceListData = [
                new ServiceBuilder().withId('1').build(),
                new ServiceBuilder().withId('3').build(),
                new ServiceBuilder().withId('2').build(),
            ];
            const theAction: BuildServicesSuccessAction = {
                type: constants.LOAD_SERVICES_SUCCESS,
                payload: {
                    topicId: topic.id,
                    services: servicesWithIds,
                },
            };
            const resultStore = reducer(theStore, theAction);
            const servicesForTask = resultStore.servicesByTopic[topic.id];
            if (isValidServicesForTopic(servicesForTask)) {
                const serviceIds = servicesForTask.serviceIds;
                expect(serviceIds).toEqual(['1', '3', '2']);
            } else {
                fail();
            }
        });

        it('sets service ids on topic services object', () => {
            if (isValidServicesForTopic(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                services.forEach((service: HumanServiceData) => {
                    expect(serviceIds).toContain(service.id);
                });
            } else {
                fail();
            }
        });

        it('replaces service ids on existing topic services object', () => {
            if (isValidServicesForTopic(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                expect(serviceIds).not.toContain(aService.id);
            } else {
                fail();
            }
        });
        it('provides services that are not bookmarked by default', () => {
            services.forEach((service: HumanServiceData) => {
                expect(service.bookmarked).toEqual(false);
            });
        });
    });

    describe('when populating topic services error object from an error response', () => {
        const topic = new TopicBuilder().withId(loadingTaskServicesError.topicId).build();
        const action: BuildServicesErrorAction = {
            type: constants.LOAD_SERVICES_FAILURE,
            payload: {
                topicId: topic.id,
                errorMessageType: Errors.BadServerResponse,
            },
        };
        const store = reducer(theStore, action);
        const topicServicesOrErrorEntry = store.servicesByTopic[topic.id];

        it('sets the error message type on the topic services error object', () => {
            if (topicServicesOrErrorEntry.type === constants.TOPIC_SERVICES_ERROR) {
                expect(topicServicesOrErrorEntry.errorMessageType).toBe(Errors.BadServerResponse);
            } else {
                fail();
            }
        });

        it('does not update existing services', () => {
            expect(store.services).toEqual(theStore.services);
        });
    });
// TO-DO refactor below
    describe('when bookmarking a service', () => {
        const service = new ServiceBuilder();
        const action: AddServiceToSavedListAction = {
            type: constants.ADD_SERVICE_BOOKMARK,
            payload: { service },
        };
        const store = reducer(theStore, action);
        it('can add a service to services map', () => {
            expect(Object.keys(store.services)).toHaveLength(2);
        });
        it('can add a service to services map marked as bookmarked', () => {
            expect(store.services[service.id].bookmarked).toEqual(true);
        });
    });

    describe('when removing a bookmarked service', () => {
        const bookmarkedService = new ServiceBuilder().withBookmarked(true);
        const store = buildNormalizedServices(
            [bookmarkedService],
            [loadedTaskServices, loadingTaskServices, loadedTaskServicesError, loadingTaskServicesError],
        );
        const action: RemoveServiceFromSavedListAction = {
            type: constants.REMOVE_SERVICE_BOOKMARK,
            payload: { service: bookmarkedService },
        };

        const storeState = reducer(store, action);

        it('can mark a service as no longer being bookmarked', () => {
            expect(storeState.services[bookmarkedService.id].bookmarked).toEqual(false);
        });
    });

    describe('when clear all user data action is dispatched', () => {
        const action: ClearAllUserDataAction = {
            type: constants.CLEAR_ALL_USER_DATA,
        };
        const store = reducer(theStore, action);
        it('removes services from services map', () => {
            expect(store.services).toEqual({});
        });
    });

    describe('when loading saved services', () => {
        let store: ServiceStore = undefined;
        const savedServiceId = aString();
        const savedService = new ServiceBuilder().withId(savedServiceId);
        const savedServiceMap = buildServiceMap([savedService]);
        beforeEach(() => {
            const persistedDataWhereServiceIsSaved = new PersistedUserDataBuilder().
            addSavedService(savedServiceMap).
            buildObject();
            const loadAction = UserDataPersistence.loadSuccess(persistedDataWhereServiceIsSaved);
            store = reducer(theStore, loadAction);
        });
        it('should return the saved service object', () => {
            expect(store.services[savedServiceId]).toEqual(savedServiceMap[savedServiceId]);
        });
    });
});