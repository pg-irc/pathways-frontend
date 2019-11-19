import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { HumanServiceData, Id } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';
import { LatLong } from '../../validation/latlong/types';

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
    RemoveServiceFromSavedListAction
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
export const addServiceToSavedListAction = (serviceId: Id) => (
    helpers.makeAction(constants.ADD_SERVICE_BOOKMARK, { serviceId })
);

// tslint:disable-next-line: typedef
export const removeServiceFromSavedListAction = (serviceId: Id) => (
    helpers.makeAction(constants.REMOVE_SERVICE_BOOKMARK, { serviceId })
);