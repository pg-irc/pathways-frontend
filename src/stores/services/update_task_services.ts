import { Service } from './types';
import { Id as TaskId } from '../tasks';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Action as ReduxAction } from 'redux';

// TODO use makeAction helper instead
// TODO rename this file to actions.ts
interface UpdateTaskServicesAction<P extends {} = {}> extends ReduxAction {
    readonly payload: P;
}

export namespace UpdateTaskServicesAsync {
    export interface Request extends UpdateTaskServicesAction {
        readonly payload: { readonly taskId: TaskId; };
    }

    export interface Success extends UpdateTaskServicesAction {
        readonly payload: { readonly taskId: TaskId; readonly services: ReadonlyArray<Service>; };
    }

    export interface Failure extends UpdateTaskServicesAction {
        readonly payload: { readonly taskId: TaskId; readonly message: string; };
    }

    export type Result = Success | Failure;
    export type Action = Request | Result;

    export const request = (taskId: TaskId): UpdateTaskServicesAsync.Request => {
        return helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { taskId });
    };

    export const success = (taskId: TaskId, services: ReadonlyArray<Service>): UpdateTaskServicesAsync.Success => {
        return helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { taskId, services });
    };

    export const failure = (message: string, taskId: TaskId): UpdateTaskServicesAsync.Failure => {
        return helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { message, taskId });
    };
}
