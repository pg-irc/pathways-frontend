import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { HumanServiceData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';
import { LatLong } from '../../validation/latlong/types';
import { UserDataPersistence } from '../user_data';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type BuildServicesRequestAction = Readonly<ReturnType<typeof buildServicesRequestAction>>;

export type BuildServicesSuccessAction = Readonly<ReturnType<typeof buildServicesSuccessAction>>;

export type BuildServicesErrorAction = Readonly<ReturnType<typeof buildServicesErrorAction>>;

export type AddServiceToSavedListAction = Readonly<ReturnType<typeof addServiceToSavedListAction>>;

export type RemoveServiceFromSavedListAction = Readonly<ReturnType<typeof removeServiceFromSavedListAction>>;

export type ServicesAction =
    BuildServicesRequestAction |
    BuildServicesSuccessAction |
    BuildServicesErrorAction |
    AddServiceToSavedListAction |
    RemoveServiceFromSavedListAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearAllUserDataAction
    ;

// tslint:disable-next-line:typedef
export const buildServicesRequestAction = (topicId: TopicId, manualUserLocation?: LatLong) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { topicId, manualUserLocation })
);

// tslint:disable-next-line:typedef
export const buildServicesSuccessAction = (topicId: TopicId, services: ReadonlyArray<HumanServiceData>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { topicId, services })
);

// tslint:disable-next-line:typedef
export const buildServicesErrorAction = (topicId: TopicId, errorMessageType: Errors) => (
    helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { topicId, errorMessageType })
);

// tslint:disable-next-line: typedef
export const addServiceToSavedListAction = (service: HumanServiceData) => (
    helpers.makeAction(constants.ADD_SERVICE_BOOKMARK, { service })
);

// tslint:disable-next-line: typedef
export const removeServiceFromSavedListAction = (service: HumanServiceData) => (
    helpers.makeAction(constants.REMOVE_SERVICE_BOOKMARK, { service })
);