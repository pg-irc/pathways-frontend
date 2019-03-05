import { Id as TaskId } from '../../fixtures/types/tasks';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Service } from './types';

export type SendTaskServicesRequestAction = Readonly<ReturnType<typeof sendTaskServicesRequest>>;

export type PopulateTaskServicesFromSuccessAction = Readonly<ReturnType<typeof populateTaskServicesFromSuccess>>;

export type PopulateTaskServicesFromErrorAction = Readonly<ReturnType<typeof populateTaskServicesFromError>>;

export type ServicesAction =
    SendTaskServicesRequestAction |
    PopulateTaskServicesFromSuccessAction |
    PopulateTaskServicesFromErrorAction;

export enum ErrorMessageType {
    Location,
    Server,
    Exception,
}

// tslint:disable-next-line:typedef
export const sendTaskServicesRequest = (taskId: TaskId) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { taskId })
);

// tslint:disable-next-line:typedef
export const populateTaskServicesFromSuccess = (taskId: TaskId, services: ReadonlyArray<Service>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { taskId, services })
);

// tslint:disable-next-line:typedef
export const populateTaskServicesFromError = (errorMessage: string, taskId: TaskId, errorMessageType: ErrorMessageType) => (
   helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { errorMessage, taskId, errorMessageType })
);