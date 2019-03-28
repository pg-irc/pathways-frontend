import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Service } from './types';
import { ServicesErrorType } from '../../sagas/services';

export type SendTopicServicesRequestAction = Readonly<ReturnType<typeof sendTopicServicesRequest>>;

export type PopulateTopicServicesFromSuccessAction = Readonly<ReturnType<typeof populateTopicServicesFromSuccess>>;

export type PopulateTopicServicesFromErrorAction = Readonly<ReturnType<typeof populateTopicServicesFromError>>;

export type ServicesAction =
    SendTopicServicesRequestAction |
    PopulateTopicServicesFromSuccessAction |
    PopulateTopicServicesFromErrorAction;

// tslint:disable-next-line:typedef
export const sendTopicServicesRequest = (topicId: TopicId) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { topicId })
);

// tslint:disable-next-line:typedef
export const populateTopicServicesFromSuccess = (topicId: TopicId, services: ReadonlyArray<Service>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { topicId, services })
);

// tslint:disable-next-line:typedef
export const populateTopicServicesFromError = (
    errorMessage: string,
    topicId: TopicId,
    errorMessageType: ServicesErrorType) => (
        helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { errorMessage, topicId, errorMessageType })
    );