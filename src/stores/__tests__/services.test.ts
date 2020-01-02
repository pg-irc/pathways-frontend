// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import { reducer } from '../services';
import { isValidServicesForTopic } from '../services/is_valid_services_for_topic';
import {
    BuildServicesRequestAction, BuildServicesSuccessAction,
    BuildServicesErrorAction,
    SaveServiceAction,
    BookmarkServiceAction,
    UnbookmarkServiceAction,
} from '../services/actions';
import { HumanServiceData, ServiceStore } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';
import { TopicBuilder } from './helpers/topics_helpers';
import { aString } from '../../helpers/random_test_values';
import { ServiceBuilder, buildNormalizedServices, TaskServicesBuilder, TaskServicesErrorBuilder, buildServiceMap } from './helpers/services_helpers';
import { isServiceLoading } from '../../validation/services/types';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { DataPersistence } from '../persisted_data';

describe('services reducer', () => {
    const aServiceBuilder = new ServiceBuilder();
    const loadedTaskServices = new TaskServicesBuilder().withServiceIds([aServiceBuilder.id]);
    const loadingTaskServices = new TaskServicesBuilder().withLoading(true);
    const loadedTaskServicesError = new TaskServicesErrorBuilder();
    const loadingTaskServicesError = new TaskServicesErrorBuilder().withLoading(true);
    const theStore = buildNormalizedServices(
        [aServiceBuilder],
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
        const services: ReadonlyArray<HumanServiceData> = [new ServiceBuilder().build(), new ServiceBuilder().build()];
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
            const servicesWithIds: ReadonlyArray<HumanServiceData> = [
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
                expect(serviceIds).not.toContain(aServiceBuilder.id);
            } else {
                fail();
            }
        });

        it('sets service by topic expiration', () => {
            if (isValidServicesForTopic(topicServicesOrErrorEntry)) {
                expect(topicServicesOrErrorEntry.expiresAt).toBeDefined();
            } else {
                fail();
            }
        });

        it('sets services by topic expiration to 24 hours from now', () => {
            const expiresAt = Date.now();
            const taskServicesBuilder = new TaskServicesBuilder().withExpiresAt(expiresAt);
            const topicId = taskServicesBuilder.topicId;
            const serviceBuilder = new ServiceBuilder().withId(topicId);
            const storeBeforeAction = buildNormalizedServices([serviceBuilder], [taskServicesBuilder]);
            const theAction: BuildServicesSuccessAction = {
                type: constants.LOAD_SERVICES_SUCCESS,
                payload: {
                    topicId,
                    services: [serviceBuilder.build()],
                },
            };
            const storeAfterAction = reducer(storeBeforeAction, theAction);
            const servicesByTopic = storeAfterAction.servicesByTopic[topicId];

            if (isValidServicesForTopic(servicesByTopic)) {
                const twentyFourHoursAfterExpiry = expiresAt + (24 * 60 * 60 * 1000);
                const upperLimit = twentyFourHoursAfterExpiry + 5000;
                expect(servicesByTopic.expiresAt).toBeGreaterThanOrEqual(twentyFourHoursAfterExpiry);
                expect(servicesByTopic.expiresAt).toBeLessThan(upperLimit);
            } else {
                fail();
            }
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

    describe('when sending a save search service action', () => {

        it('updates the store with the new service', () => {
            const aSearchService = new ServiceBuilder().build();
            const action: SaveServiceAction = {
                type: constants.SAVE_SERVICE,
                payload: {
                    service: aSearchService,
                },
            };
            const store = reducer(theStore, action);
            expect(store.services[aSearchService.id]).toEqual(aSearchService);
        });

        it('overwrites an existing service with the same id', () => {
            const serviceId = aString();
            const oldService = new ServiceBuilder().withId(serviceId);
            const oldStore = buildNormalizedServices([oldService], []);

            const newService = new ServiceBuilder().withId(serviceId).build();
            const action: SaveServiceAction = {
                type: constants.SAVE_SERVICE,
                payload: {
                    service: newService,
                },
            };

            const newStore = reducer(oldStore, action);
            expect(newStore.services[serviceId].name).toEqual(newService.name);
        });
    });

    describe('when bookmarking a service', () => {
        const store = buildNormalizedServices([], []);
        const service = new ServiceBuilder().build();
        const action: BookmarkServiceAction = {
            type: constants.BOOKMARK_SERVICE,
            payload: { service },
        };
        const storeState = reducer(store, action);
        it('can add a service to service map', () => {
            expect(Object.keys(storeState.services)).toHaveLength(1);
        });
        it('can add a service to services map marked as bookmarked', () => {
            expect(storeState.services[service.id].bookmarked).toBe(true);
        });
    });

    describe('when removing a bookmarked service', () => {
        const bookmarkedServiceBuilder = new ServiceBuilder().withBookmarked(true);
        const store = buildNormalizedServices([bookmarkedServiceBuilder], []);
        const bookmarkedService = bookmarkedServiceBuilder.build();
        const action: UnbookmarkServiceAction = {
            type: constants.UNBOOKMARK_SERVICE,
            payload: { service: bookmarkedService },
        };
        const storeState = reducer(store, action);
        it('can mark a service as no longer being bookmarked', () => {
            expect(storeState.services[bookmarkedService.id].bookmarked).toBe(false);
        });
    });

    describe('when clear all user data action is dispatched', () => {
        const serviceBuilder = new ServiceBuilder();
        const store = buildNormalizedServices([serviceBuilder], []);
        const action: ClearAllUserDataAction = {
            type: constants.CLEAR_ALL_USER_DATA,
        };
        const storeState = reducer(store, action);
        it('removes services from service map', () => {
            expect(storeState.services).toEqual({});
        });
    });

    describe('when loading bookmarked services', () => {
        let storeState: ServiceStore = undefined;
        const store = buildNormalizedServices([], []);
        const bookmarkedServiceId = aString();
        const bookmarkedServiceBuilder = new ServiceBuilder().withId(bookmarkedServiceId).withBookmarked(true);
        const bookmarkedServiceMap = buildServiceMap([bookmarkedServiceBuilder]);
        beforeEach(() => {
            const userDataWithBookmarkedService = new PersistedDataBuilder().
                withBookmarkedServices(bookmarkedServiceMap).
                build();
            const loadAction = DataPersistence.loadSuccess(userDataWithBookmarkedService);
            storeState = reducer(store, loadAction);
        });
        it('should return the bookmarked service map', () => {
            expect(storeState.services).toEqual(bookmarkedServiceMap);
        });
        it('it should return the bookmarked service', () => {
            const bookmarkedService = bookmarkedServiceBuilder.build();
            expect(storeState.services[bookmarkedServiceId]).toEqual(bookmarkedService);
        });
    });
});
