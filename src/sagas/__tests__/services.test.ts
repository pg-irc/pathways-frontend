// tslint:disable:no-expression-statement no-let no-null-keyword
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { API, APIError } from '../../api';
import { updateTaskServices } from '../services';
import { TaskBuilder } from '../../stores/__tests__/helpers/tasks_helpers';
import { Task } from '../../stores/tasks';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { updateTaskServicesAsync, UpdateTaskServicesAsync, Service } from '../../stores/services';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';

describe('The update task services saga', () => {
    const locale = new LocaleBuilder().build();

    it('should dispatch a call effect for api.getRelatedServicesForTask', () => {
        const task = new TaskBuilder().withLocaleCode(locale.code).build();
        const query = aString();
        const action = updateTaskServicesAsync.request(task, query);
        const saga = updateTaskServices(action);
        const value = saga.next().value;
        expect(value).toEqual(call(API.searchServices, query));
    });

    describe('after making request for related services, should', () => {
        let task: Task;
        let query: string;
        let saga: IterableIterator<CallEffect | PutEffect<UpdateTaskServicesAsync.Action>>;
        let action: UpdateTaskServicesAsync.Request;

        beforeEach(() => {
            task = new TaskBuilder().withLocaleCode(locale.code).build();
            query = aString();
            action = updateTaskServicesAsync.request(task, query);
            saga = updateTaskServices(action);
            saga.next();
        });

        it('dispatch a success action with the results', () => {
            const results: ReadonlyArray<Service> = [];
            const value = saga.next(results).value;
            expect(value).toEqual(put(updateTaskServicesAsync.success(task, results)));
        });

        it('dispatch a failure action if there is an error', () => {
            const error = new APIError(aString());
            const value = saga.throw(error).value;
            expect(value).toEqual(put(updateTaskServicesAsync.failure(error.message, task)));
        });

    });

});