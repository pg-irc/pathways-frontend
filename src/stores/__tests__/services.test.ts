// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import {
    reducer, SendTaskServicesRequestAction, PopulateTaskServicesFromSuccessAction,
    PopulateTaskServicesFromErrorAction, Service, ErrorMessageType,
} from '../services';
import { TaskBuilder } from './helpers/tasks_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { ServiceBuilder, buildNormalizedServices, TaskServicesBuilder, TaskServicesErrorBuilder } from './helpers/services_helpers';

describe('services reducer', () => {
    const loadedTask = new TaskServicesBuilder();
    const loadingTask = new TaskServicesBuilder().withLoading(true);
    const taskWithError = new TaskServicesBuilder();
    const initialService = new ServiceBuilder();
    const initialErrors = new TaskServicesErrorBuilder().withTaskId(taskWithError.id);
    const theStore = buildNormalizedServices([loadedTask, loadingTask], [initialService], [initialErrors]);

    it('returns a unmodified store when the action is missing', () => {
        expect(reducer(theStore)).toBe(theStore);
    });

    describe('when sending a task services request', () => {
        const task = new TaskBuilder().build();
        const action: SendTaskServicesRequestAction = {
            type: constants.LOAD_SERVICES_REQUEST,
            payload: { taskId: task.id },
        };
        const store = reducer(theStore, action);
        const taskServices = store.taskServicesMap[task.id];

        it('creates a complete but empty task services object if none exists for the task', () => {
            expect(taskServices.serviceIds).toEqual([]);
        });

        it('sets the task services as loading', () => {
            expect(taskServices.loading).toBe(true);
        });

        it('does not add entry to errors map', () => {
            expect(store.taskServicesErrors[task.id]).toBeUndefined();
        });

    });

    describe('when sending a task services request for tasks with errors', () => {
        it('removes entry from errors map', () => {
            const action: SendTaskServicesRequestAction = {
                type: constants.LOAD_SERVICES_REQUEST,
                payload: { taskId: taskWithError.id },
            };
            const store = reducer(theStore, action);
            expect(store.taskServicesErrors).toEqual({});
        });
    });

    describe('when populating task services from a success response', () => {
        const task = new TaskBuilder().withId(loadingTask.id).build();
        const services: ReadonlyArray<Service> = [new ServiceBuilder().build(), new ServiceBuilder().build()];
        const action: PopulateTaskServicesFromSuccessAction = {
            type: constants.LOAD_SERVICES_SUCCESS,
            payload: { taskId: task.id, services },
        };
        const store = reducer(theStore, action);

        it('updates the service map', () => {
            const serviceMap = store.serviceMap;
            services.forEach((service: Service) => {
                expect(serviceMap[service.id]).toBe(service);
            });
        });

        it('sets the task services as not loading', () => {
            const taskServices = store.taskServicesMap[task.id];
            expect(taskServices.loading).toBe(false);
        });

        it('sets the task\'s service ids', () => {
            const taskServices = store.taskServicesMap[task.id];
            services.forEach((service: Service) => {
                expect(taskServices.serviceIds).toContain(service.id);
            });
        });

        it('replaces the task\'s existing service ids', () => {
            const taskServices = store.taskServicesMap[task.id];
            expect(taskServices.serviceIds).not.toContain(initialService.id);
        });

        it('does not add entry to errors map', () => {
            expect(store.taskServicesErrors[task.id]).toBeUndefined();
        });
    });

    describe('when populating tasks services on a success response for tasks with errors', () => {
        it('removes entry from errors map', () => {
            const services: ReadonlyArray<Service> = [new ServiceBuilder().build(), new ServiceBuilder().build()];
            const action: PopulateTaskServicesFromSuccessAction = {
                type: constants.LOAD_SERVICES_SUCCESS,
                payload: { taskId: taskWithError.id, services },
            };
            const store = reducer(theStore, action);
            expect(store.taskServicesErrors).toEqual({});
        });
    });

    describe('when populating task services from an error response', () => {
        const task = new TaskBuilder().withId(loadingTask.id).build();
        const message = aString();
        const action: PopulateTaskServicesFromErrorAction = {
            type: constants.LOAD_SERVICES_FAILURE,
            payload: {
                errorMessage: message,
                taskId: task.id,
                errorMessageType: ErrorMessageType.Server,
            },
        };
        const store = reducer(theStore, action);
        const taskServicesErrors = store.taskServicesErrors[task.id];

        it('sets the task services as not loading', () => {
            expect(store.taskServicesMap[task.id].loading).toBe(false);
        });

        it('sets the task services error message', () => {
            expect(taskServicesErrors.errorMessage).toBe(message);
        });

        it('sets the task services error message type', () => {
            expect(taskServicesErrors.errorMessageType).toBe(ErrorMessageType.Server);
        });

        it('sets the task services error message task id', () => {
            expect(taskServicesErrors.taskId).toBe(task.id);
        });

        it('doesn\'t modify existing (cached) task services', () => {
            const oldServiceIds = theStore.taskServicesMap[task.id].serviceIds;
            const newServiceIds = store.taskServicesMap[task.id].serviceIds;
            expect(newServiceIds).toBe(oldServiceIds);
        });

    });

});
