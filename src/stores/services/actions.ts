import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Service } from './types';
import { Errors } from '../../errors/types';
import { LatLong } from '../../components/search/types';
import { UserDataPersistence } from '../user_data';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { ClearErrorAction } from '../clear_error';

export type BuildTopicServicesRequestAction = Readonly<ReturnType<typeof buildTopicServicesRequestAction>>;

export type BuildTopicServicesSuccessAction = Readonly<ReturnType<typeof buildTopicServicesSuccessAction>>;

export type BuildTopicServicesErrorAction = Readonly<ReturnType<typeof buildTopicServicesErrorAction>>;

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;

export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;

export type ServicesAction =
    BuildTopicServicesRequestAction |
    BuildTopicServicesSuccessAction |
    BuildTopicServicesErrorAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction;

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

// tslint:disable-next-line:typedef
export const addToSavedList = (service: Service) => {
    return helpers.makeAction(constants.ADD_BOOKMARK, { service });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (service: Service) => (
    helpers.makeAction(constants.REMOVE_BOOKMARK, { service })
);