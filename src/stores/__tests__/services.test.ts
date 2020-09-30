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
import { aString } from '../../application/helpers/random_test_values';
import { HumanServiceDataBuilder, buildNormalizedServices, ServicesForTopicBuilder, ServicesForTopicErrorBuilder, buildServiceMap } from './helpers/services_helpers';
import { isServiceLoading } from '../../validation/services/types';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { DataPersistence } from '../persisted_data';

describe('services reducer', () => {
    const aServiceBuilder = new HumanServiceDataBuilder();
    const loadedServicesForTopic = new ServicesForTopicBuilder().withServiceIds([aServiceBuilder.id]);
    const loadingServicesForTopic = new ServicesForTopicBuilder().withLoading(true);
    const loadedServicesForTopicError = new ServicesForTopicErrorBuilder();
    const loadingServicesForTopicError = new ServicesForTopicErrorBuilder().withLoading(true);
    const theStore = buildNormalizedServices(
        [aServiceBuilder],
        [loadedServicesForTopic, loadingServicesForTopic, loadedServicesForTopicError, loadingServicesForTopicError],
    );

    it('returns a unmodified store when the action is missing', () => {
        expect(reducer(theStore)).toBe(theStore);
    });

    describe('when sending a services for topic request', () => {

        it('creates loading services for topic object', () => {
            const topicId = aString();
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServicesOrError = store.servicesByTopic[topicId];
            expect(topicServicesOrError).toEqual({ type: constants.LOADING_SERVICES_FOR_TOPIC });
        });

        it('sets state of the topic service to loading', () => {
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedServicesForTopic.topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServices = store.servicesByTopic[loadedServicesForTopic.topicId];
            expect(isServiceLoading(topicServices)).toBe(true);
        });

        it('sets loading to true on pre existing services for topic error objects', () => {
            const action: BuildServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedServicesForTopicError.topicId, manualUserLocation: undefined },
            };
            const store = reducer(theStore, action);
            const topicServicesError = store.servicesByTopic[loadedServicesForTopicError.topicId];
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

    describe('when populating services for topic objects from a success response', () => {
        const topic = new TopicBuilder().withId(loadingServicesForTopic.topicId).build();
        const services: ReadonlyArray<HumanServiceData> = [new HumanServiceDataBuilder().build(), new HumanServiceDataBuilder().build()];
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
                new HumanServiceDataBuilder().withId('1').build(),
                new HumanServiceDataBuilder().withId('3').build(),
                new HumanServiceDataBuilder().withId('2').build(),
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

        it('sets service ids on services for topic object', () => {
            if (isValidServicesForTopic(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                services.forEach((service: HumanServiceData) => {
                    expect(serviceIds).toContain(service.id);
                });
            } else {
                fail();
            }
        });

        it('replaces service ids on existing services for topic object', () => {
            if (isValidServicesForTopic(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                expect(serviceIds).not.toContain(aServiceBuilder.id);
            } else {
                fail();
            }
        });

    });

    describe('when populating services for topic error object from an error response', () => {
        const topic = new TopicBuilder().withId(loadingServicesForTopicError.topicId).build();
        const action: BuildServicesErrorAction = {
            type: constants.LOAD_SERVICES_FAILURE,
            payload: {
                topicId: topic.id,
                errorMessageType: Errors.BadServerResponse,
            },
        };
        const store = reducer(theStore, action);
        const topicServicesOrErrorEntry = store.servicesByTopic[topic.id];

        it('sets the error message type on the services for topic error object', () => {
            if (topicServicesOrErrorEntry.type === constants.ERROR_SERVICES_FOR_TOPIC) {
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
            const aSearchService = new HumanServiceDataBuilder().build();
            const action: SaveServiceAction = {
                type: constants.SAVE_SERVICE,
                payload: {
                    service: aSearchService,
                },
            };
            const store = reducer(theStore, action);
            const storeService = store.services[aSearchService.id];
            expect(Object.keys(aSearchService).length).toEqual(12);
            expect(storeService).toEqual(aSearchService);
        });

        it('overwrites an existing service with the same id', () => {
            const serviceId = aString();
            const oldService = new HumanServiceDataBuilder().withId(serviceId);
            const oldStore = buildNormalizedServices([oldService], []);

            const newService = new HumanServiceDataBuilder().withId(serviceId).build();
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
        const service = new HumanServiceDataBuilder().build();
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
        const bookmarkedServiceBuilder = new HumanServiceDataBuilder().withBookmarked(true);
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
        const serviceBuilder = new HumanServiceDataBuilder();
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
        const bookmarkedServiceBuilder = new HumanServiceDataBuilder().withId(bookmarkedServiceId).withBookmarked(true);
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
