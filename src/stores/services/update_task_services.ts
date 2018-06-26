import { Service } from './types';
import { Task } from '../tasks';
import { Task as constants} from '../../application/constants';
import * as helpers from '../helpers/make_action';

export namespace UpdateTaskServicesAsync {
    export type Request = Readonly<ReturnType<typeof updateTaskServicesAsync.request>>;
    export type Success = Readonly<ReturnType<typeof updateTaskServicesAsync.success>>;
    export type Failure = Readonly<ReturnType<typeof updateTaskServicesAsync.failure>>;
    export type Result = Success | Failure;
}

export type UpdateTaskServicesAction = UpdateTaskServicesAsync.Request | UpdateTaskServicesAsync.Result;

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
