import { Id as TopicId } from '../../fixtures/types/topics';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { HumanServiceData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';
import { UserLocation } from '../../validation/latlong/types';
import { DataPersistence } from '../persisted_data';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { HidePartialLocalizationMessageAction } from '../user_profile';
import { OpenHeaderMenuAction } from '../user_experience/actions';
import { SubmitServiceReviewAction } from '../reviews/actions';

export type BuildServicesRequestAction = Readonly<ReturnType<typeof buildServicesRequest>>;

export type BuildServicesSuccessAction = Readonly<ReturnType<typeof buildServicesSuccess>>;

export type BuildServicesErrorAction = Readonly<ReturnType<typeof buildServicesError>>;

export type SaveServicesForOrganizationAction = Readonly<ReturnType<typeof saveServicesForOrganization>>;

export type SaveServiceToMapAction = Readonly<ReturnType<typeof saveServiceToMap>>;
export type OpenServiceAction = Readonly<ReturnType<typeof openServiceDetail>>;

export type BookmarkServiceAction = Readonly<ReturnType<typeof bookmarkService>>;
export type UnbookmarkServiceAction = Readonly<ReturnType<typeof unbookmarkService>>;

export type ServicesAction =
    BuildServicesRequestAction |
    BuildServicesSuccessAction |
    BuildServicesErrorAction |
    SaveServicesForOrganizationAction |
    SaveServiceToMapAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    OpenServiceAction |
    DataPersistence.LoadRequestAction |
    DataPersistence.LoadSuccessAction |
    DataPersistence.LoadFailureAction |
    ClearAllUserDataAction |
    HidePartialLocalizationMessageAction |
    OpenHeaderMenuAction |
    SubmitServiceReviewAction;

// tslint:disable-next-line:typedef
export const buildServicesRequest = (topicId: TopicId, manualUserLocation?: UserLocation) => (
    helpers.makeAction(constants.LOAD_SERVICES_REQUEST, { topicId, manualUserLocation })
);

// tslint:disable-next-line:typedef
export const buildServicesSuccess = (topicId: TopicId, services: ReadonlyArray<HumanServiceData>) => (
    helpers.makeAction(constants.LOAD_SERVICES_SUCCESS, { topicId, services })
);

// tslint:disable-next-line:typedef
export const buildServicesError = (topicId: TopicId, errorMessageType: Errors) => (
    helpers.makeAction(constants.LOAD_SERVICES_FAILURE, { topicId, errorMessageType })
);

// tslint:disable-next-line:typedef
export const saveServicesForOrganization = (organizationId: string, services: ReadonlyArray<HumanServiceData>) => (
    helpers.makeAction(constants.SAVE_SERVICES_BY_ORGANIZATION, { organizationId, services })
);

// tslint:disable-next-line:typedef
export const saveServiceToMap = (service: HumanServiceData) => (
    helpers.makeAction(constants.SAVE_SERVICE_TO_MAP, { service })
);

// tslint:disable-next-line: typedef
export const bookmarkService = (service: HumanServiceData) => (
    helpers.makeAction(constants.BOOKMARK_SERVICE, { service })
);

// tslint:disable-next-line: typedef
export const unbookmarkService = (service: HumanServiceData) => (
    helpers.makeAction(constants.UNBOOKMARK_SERVICE, { service })
);

// tslint:disable-next-line:typedef
export const openServiceDetail = (service: HumanServiceData) => (
    helpers.makeAction(constants.OPEN_SERVICE_DETAIL, { service })
);