// tslint:disable:typedef

import { Service } from './types';
import { Id as TaskId } from '../tasks';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export namespace UpdateServicesAsync {

    export const request = (taskId: TaskId) => {
        return helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { taskId });
    };

    export const success = (taskId: TaskId, services: ReadonlyArray<Service>) => {
        return helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { taskId, services });
    };

    export const failure = (message: string, taskId: TaskId) => {
        return helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { message, taskId });
    };

    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;

    export type Result = Success | Failure;
    export type Action = Request | Result;
}
