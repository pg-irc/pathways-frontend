import { HumanOrganizationData } from '../../validation/organizations/types';
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { Errors } from '../../validation/errors/types';

export type OpenOrganizationAction = Readonly<ReturnType<typeof openOrganization>>;
export type LoadingOrganizationAction = Readonly<ReturnType<typeof loadingOrganization>>;
export type SaveOrganizationAction = Readonly<ReturnType<typeof saveOrganization>>;
export type ErrorOrganizationAction = Readonly<ReturnType<typeof errorOrganization>>;

// tslint:disable-next-line:typedef
export const openOrganization = (organizationId: string) => (
    helpers.makeAction(constants.OPEN_ORGANIZATION, { organizationId })
);
// tslint:disable-next-line:typedef
export const loadingOrganization = () => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_REQUEST)
);

// tslint:disable-next-line:typedef
export const saveOrganization = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_SUCCESS, { organization })
);

// tslint:disable-next-line:typedef
export const errorOrganization = (organizationId: string, errorMessageType: Errors) => (
    helpers.makeAction(constants.LOAD_ORGANIZATION_FAILURE, { organizationId, errorMessageType })
);

export type OrganizationAction =
    SaveOrganizationAction |
    OpenOrganizationAction |
    ErrorOrganizationAction |
    LoadingOrganizationAction |
    ClearAllUserDataAction;