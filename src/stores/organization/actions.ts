import { HumanOrganizationData } from '../../validation/organizations/types';
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { Errors } from '../../validation/errors/types';

export type OpenOrganizationAction = Readonly<ReturnType<typeof openOrganization>>;
export type OrganizationRequestAction = Readonly<ReturnType<typeof buildOrganizationRequest>>;
export type OrganizationSuccessAction = Readonly<ReturnType<typeof buildOrganizationSuccess>>;
export type OrganizationFailureAction = Readonly<ReturnType<typeof buildOrganizationFailure>>;

// tslint:disable-next-line:typedef
export const openOrganization = (organizationId: string) => (
    helpers.makeAction(constants.OPEN_ORGANIZATION, { organizationId })
);
// tslint:disable-next-line:typedef
export const buildOrganizationRequest = () => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_REQUEST)
);

// tslint:disable-next-line:typedef
export const buildOrganizationSuccess = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_SUCCESS, { organization })
);

// tslint:disable-next-line:typedef
export const buildOrganizationFailure = (organizationId: string, errorMessageType: Errors) => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_FAILURE, { organizationId, errorMessageType })
);

export type OrganizationAction =
    OpenOrganizationAction |
    OrganizationRequestAction |
    OrganizationSuccessAction |
    OrganizationFailureAction |
    ClearAllUserDataAction;