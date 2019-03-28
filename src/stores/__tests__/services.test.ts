// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import {
    reducer, SendTaskServicesRequestAction, PopulateTaskServicesFromSuccessAction,
    PopulateTaskServicesFromErrorAction, Service, isValidTaskServices,
} from '../services';
import { AsyncGenericErrorType } from '../../async/error_types';
import { TaskBuilder } from './helpers/tasks_helpers';
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

    describe('when sending a task services request', () => {

        it('creates loading task services object', () => {
            const taskId = aString();
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { taskId },
            };
            const store = reducer(theStore, action);
            const taskServicesOrError = store.taskServicesOrError[taskId];
            expect(taskServicesOrError).toEqual({ type: constants.TOPIC_SERVICES_LOADING });
        });

        it('sets state of the task service to loading', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { taskId: loadedTaskServices.taskId },
            };
            const store = reducer(theStore, action);
            const taskServices = store.taskServicesOrError[loadedTaskServices.taskId];
            expect(isServiceLoading(taskServices)).toBe(true);
        });

        it('sets loading to true on pre existing task services error objects', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { taskId: loadedTaskServicesError.taskId },
            };
            const store = reducer(theStore, action);
            const taskServicesError = store.taskServicesOrError[loadedTaskServicesError.taskId];
            expect(isServiceLoading(taskServicesError)).toBe(true);
        });

        it('does not update existing services', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { taskId: aString() },
            };
            const store = reducer(theStore, action);
            expect(store.services).toEqual(theStore.services);
        });
    });

    describe('when populating task services objects from a success response', () => {
        const task = new TaskBuilder().withId(loadingTaskServices.taskId).build();
        const services: ReadonlyArray<Service> = [new ServiceBuilder().build(), new ServiceBuilder().build()];
        const action: PopulateTaskServicesFromSuccessAction = {
            type: constants.LOAD_SERVICES_SUCCESS,
            payload: {
                taskId: task.id,
                services,
            },
        };
        const store = reducer(theStore, action);
        const taskServicesOrErrorEntry = store.taskServicesOrError[task.id];

        it('updates services', () => {
            const serviceMap = store.services;
            services.forEach((service: Service) => {
                expect(serviceMap[service.id]).toBe(service);
            });
        });

        it('maintains the ordering of the services in the tasks service vector', () => {
            const servicesWithIds: ReadonlyArray<Service> = [
                new ServiceBuilder().withId('1').build(),
                new ServiceBuilder().withId('3').build(),
                new ServiceBuilder().withId('2').build(),
            ];
            const theAction: PopulateTaskServicesFromSuccessAction = {
                type: constants.LOAD_SERVICES_SUCCESS,
                payload: {
                    taskId: task.id,
                    services: servicesWithIds,
                },
            };
            const resultStore = reducer(theStore, theAction);
            const servicesForTask = resultStore.taskServicesOrError[task.id];
            if (isValidTaskServices(servicesForTask)) {
                const serviceIds = servicesForTask.serviceIds;
                expect(serviceIds).toEqual(['1', '3', '2']);
            } else {
                fail();
            }
        });

        it('sets service ids on task services object', () => {
            if (isValidTaskServices(taskServicesOrErrorEntry)) {
                const serviceIds = taskServicesOrErrorEntry.serviceIds;
                services.forEach((service: Service) => {
                    expect(serviceIds).toContain(service.id);
                });
            } else {
                fail();
            }
        });

        it('replaces service ids on existing task services object', () => {
            if (isValidTaskServices(taskServicesOrErrorEntry)) {
                const serviceIds = taskServicesOrErrorEntry.serviceIds;
                expect(serviceIds).not.toContain(aService.id);
            } else {
                fail();
            }
        });
    });

    describe('when populating task services error object from an error response', () => {
        const task = new TaskBuilder().withId(loadingTaskServicesError.taskId).build();
        const anErrorMessage = aString();
        const action: PopulateTaskServicesFromErrorAction = {
            type: constants.LOAD_SERVICES_FAILURE,
            payload: {
                errorMessage: anErrorMessage,
                taskId: task.id,
                errorMessageType: AsyncGenericErrorType.BadServerResponse,
            },
        };
        const store = reducer(theStore, action);
        const taskServicesOrErrorEntry = store.taskServicesOrError[task.id];

        it('sets the error message on the task services error object', () => {
            if (taskServicesOrErrorEntry.type === constants.TOPIC_SERVICES_ERROR) {
                expect(taskServicesOrErrorEntry.errorMessage).toBe(anErrorMessage);
            } else {
                fail();
            }
        });

        it('sets the error message type on the task services error object', () => {
            if (taskServicesOrErrorEntry.type === constants.TOPIC_SERVICES_ERROR) {
                expect(taskServicesOrErrorEntry.errorMessageType).toBe(AsyncGenericErrorType.BadServerResponse);
            } else {
                fail();
            }
        });

        it('does not update existing services', () => {
            expect(store.services).toEqual(theStore.services);
        });
    });
});
