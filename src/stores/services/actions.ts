import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Service } from '../../validation/services/types';
import { Errors } from '../../errors/types';
import { LatLong } from '../../validation/search/types';

export type BuildTopicServicesRequestAction = Readonly<ReturnType<typeof buildTopicServicesRequestAction>>;

export type BuildTopicServicesSuccessAction = Readonly<ReturnType<typeof buildTopicServicesSuccessAction>>;

export type BuildTopicServicesErrorAction = Readonly<ReturnType<typeof buildTopicServicesErrorAction>>;

export type ServicesAction =
    BuildTopicServicesRequestAction |
    BuildTopicServicesSuccessAction |
    BuildTopicServicesErrorAction;

// tslint:disable-next-line:typedef
export const buildTopicServicesRequestAction = (topicId: TopicId, manualUserLocation?: LatLong) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { topicId, manualUserLocation })
);

// tslint:disable-next-line:typedef
export const buildTopicServicesSuccessAction = (topicId: TopicId, services: ReadonlyArray<Service>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { topicId, services })
);

// tslint:disable-next-line:typedef
export const buildTopicServicesErrorAction = (
    topicId: TopicId,
    errorMessageType: Errors) => (
        helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { topicId, errorMessageType })
    );