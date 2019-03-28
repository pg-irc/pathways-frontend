import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Service } from './types';
import { ServicesErrorType } from '../../sagas/services';

export type SendTaskServicesRequestAction = Readonly<ReturnType<typeof sendTaskServicesRequest>>;

export type PopulateTaskServicesFromSuccessAction = Readonly<ReturnType<typeof populateTaskServicesFromSuccess>>;

export type PopulateTaskServicesFromErrorAction = Readonly<ReturnType<typeof populateTaskServicesFromError>>;

export type ServicesAction =
    SendTaskServicesRequestAction |
    PopulateTaskServicesFromSuccessAction |
    PopulateTaskServicesFromErrorAction;

// tslint:disable-next-line:typedef
export const sendTaskServicesRequest = (topicId: TopicId) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { topicId })
);

// tslint:disable-next-line:typedef
export const populateTaskServicesFromSuccess = (topicId: TopicId, services: ReadonlyArray<Service>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { topicId, services })
);

// tslint:disable-next-line:typedef
export const populateTaskServicesFromError = (
    errorMessage: string,
    topicId: TopicId,
    errorMessageType: ServicesErrorType) => (
        helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { errorMessage, topicId, errorMessageType })
    );