import { HumanOrganizationData } from '../../validation/organizations/types';
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { Errors } from '../../validation/errors/types';

export type SaveOrganizationAction = Readonly<ReturnType<typeof saveOrganization>>;
export type OpenOrganizationAction = Readonly<ReturnType<typeof openOrganization>>;
export type OrganizationErrorAction = Readonly<ReturnType<typeof buildOrganizationError>>;
export type OrganizationLoadingAction = Readonly<ReturnType<typeof buildOrganizationLoading>>;
export type OrganizationSuccessAction = Readonly<ReturnType<typeof buildOrganizationSuccess>>;

// tslint:disable-next-line:typedef
export const saveOrganization = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION, { organization })
);

// tslint:disable-next-line:typedef
export const openOrganization = (organizationId: string) => (
    helpers.makeAction(constants.OPEN_ORGANIZATION, { organizationId })
);

// tslint:disable-next-line:typedef
export const buildOrganizationError = (organizationId: string, errorMessageType: Errors) => (
    helpers.makeAction(constants.ERROR_ORGANIZATION, { organizationId, errorMessageType })
);

// tslint:disable-next-line:typedef
export const buildOrganizationSuccess = (organizationId: string) => (
    helpers.makeAction(constants.VALID_ORGANIZATION, { organizationId  })
);

// tslint:disable-next-line:typedef
export const buildOrganizationLoading = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.LOADING_ORGANIZATION, { organization })
);

export type OrganizationAction =
    SaveOrganizationAction |
    OpenOrganizationAction |
    OrganizationErrorAction |
    OrganizationLoadingAction |
    OrganizationSuccessAction |
    ClearAllUserDataAction;