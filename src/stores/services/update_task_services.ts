import { Service } from './types';
import { Task } from '../tasks';
import { Task as constants} from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Action as ReduxAction } from 'redux';

interface UpdateTaskServicesAction<P extends {} = {}> extends ReduxAction {
    readonly payload: P;
}

export namespace UpdateTaskServicesAsync {
    export interface Request extends UpdateTaskServicesAction {
        readonly payload: { readonly task: Task; readonly query: string; };
    }
    export interface Success extends UpdateTaskServicesAction {
        readonly payload: { readonly task: Task; readonly services: ReadonlyArray<Service>; };
    }
    export interface Failure extends UpdateTaskServicesAction {
        readonly payload: { readonly task: Task; readonly message: string; };
    }
    export type Result = Success | Failure;
    export type Action = Request | Result;
}

export const updateTaskServicesAsync = {
    // tslint:disable-next-line:typedef
    request(task: Task, query: string) {
        return helpers.makeAction(constants.UPDATE_SERVICES_REQUEST, { task, query });
    },
    // tslint:disable-next-line:typedef
    success(task: Task, services: ReadonlyArray<Service>) {
        return helpers.makeAction(constants.UPDATE_SERVICES_SUCCESS, { task, services });
    },
    // tslint:disable-next-line:typedef
    failure(message: string, task: Task) {
        return helpers.makeAction(constants.UPDATE_SERVICES_FAILURE, { message, task });
    },
};
