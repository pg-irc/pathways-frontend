// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import {
    reducer, SendTaskServicesRequestAction, PopulateTaskServicesFromSuccessAction,
    PopulateTaskServicesFromErrorAction, Service, isValidTaskServices,
} from '../services';
import { AsyncGenericErrorType } from '../../async/error_types';
import { TopicBuilder } from './helpers/topics_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { ServiceBuilder, buildNormalizedServices, TaskServicesBuilder, TaskServicesErrorBuilder } from './helpers/services_helpers';
import { isServiceLoading } from '../services/types';

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
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId },
            };
            const store = reducer(theStore, action);
            const topicServicesOrError = store.taskServicesOrError[topicId];
            expect(topicServicesOrError).toEqual({ type: constants.TOPIC_SERVICES_LOADING });
        });

        it('sets state of the topic service to loading', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedTaskServices.topicId },
            };
            const store = reducer(theStore, action);
            const topicServices = store.taskServicesOrError[loadedTaskServices.topicId];
            expect(isServiceLoading(topicServices)).toBe(true);
        });

        it('sets loading to true on pre existing topic services error objects', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: loadedTaskServicesError.topicId },
            };
            const store = reducer(theStore, action);
            const topicServicesError = store.taskServicesOrError[loadedTaskServicesError.topicId];
            expect(isServiceLoading(topicServicesError)).toBe(true);
        });

        it('does not update existing services', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { topicId: aString() },
            };
            const store = reducer(theStore, action);
            expect(store.services).toEqual(theStore.services);
        });
    });

    describe('when populating topic services objects from a success response', () => {
        const topic = new TopicBuilder().withId(loadingTaskServices.topicId).build();
        const services: ReadonlyArray<Service> = [new ServiceBuilder().build(), new ServiceBuilder().build()];
        const action: PopulateTaskServicesFromSuccessAction = {
            type: constants.LOAD_SERVICES_SUCCESS,
            payload: {
                topicId: topic.id,
                services,
            },
        };
        const store = reducer(theStore, action);
        const topicServicesOrErrorEntry = store.taskServicesOrError[topic.id];

        it('updates services', () => {
            const serviceMap = store.services;
            services.forEach((service: Service) => {
                expect(serviceMap[service.id]).toBe(service);
            });
        });

        it('maintains the ordering of the services in the topics service vector', () => {
            const servicesWithIds: ReadonlyArray<Service> = [
                new ServiceBuilder().withId('1').build(),
                new ServiceBuilder().withId('3').build(),
                new ServiceBuilder().withId('2').build(),
            ];
            const theAction: PopulateTaskServicesFromSuccessAction = {
                type: constants.LOAD_SERVICES_SUCCESS,
                payload: {
                    topicId: topic.id,
                    services: servicesWithIds,
                },
            };
            const resultStore = reducer(theStore, theAction);
            const servicesForTask = resultStore.taskServicesOrError[topic.id];
            if (isValidTaskServices(servicesForTask)) {
                const serviceIds = servicesForTask.serviceIds;
                expect(serviceIds).toEqual(['1', '3', '2']);
            } else {
                fail();
            }
        });

        it('sets service ids on topic services object', () => {
            if (isValidTaskServices(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                services.forEach((service: Service) => {
                    expect(serviceIds).toContain(service.id);
                });
            } else {
                fail();
            }
        });

        it('replaces service ids on existing topic services object', () => {
            if (isValidTaskServices(topicServicesOrErrorEntry)) {
                const serviceIds = topicServicesOrErrorEntry.serviceIds;
                expect(serviceIds).not.toContain(aService.id);
            } else {
                fail();
            }
        });
    });

    describe('when populating topic services error object from an error response', () => {
        const topic = new TopicBuilder().withId(loadingTaskServicesError.topicId).build();
        const anErrorMessage = aString();
        const action: PopulateTaskServicesFromErrorAction = {
            type: constants.LOAD_SERVICES_FAILURE,
            payload: {
                errorMessage: anErrorMessage,
                topicId: topic.id,
                errorMessageType: AsyncGenericErrorType.BadServerResponse,
            },
        };
        const store = reducer(theStore, action);
        const topicServicesOrErrorEntry = store.taskServicesOrError[topic.id];

        it('sets the error message on the topic services error object', () => {
            if (topicServicesOrErrorEntry.type === constants.TOPIC_SERVICES_ERROR) {
                expect(topicServicesOrErrorEntry.errorMessage).toBe(anErrorMessage);
            } else {
                fail();
            }
        });

        it('sets the error message type on the topic services error object', () => {
            if (topicServicesOrErrorEntry.type === constants.TOPIC_SERVICES_ERROR) {
                expect(topicServicesOrErrorEntry.errorMessageType).toBe(AsyncGenericErrorType.BadServerResponse);
            } else {
                fail();
            }
        });

        it('does not update existing services', () => {
            expect(store.services).toEqual(theStore.services);
        });
    });
});
