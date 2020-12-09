import { HumanOrganizationData } from '../../validation/organizations/types';
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type SaveOrganizationAction = Readonly<ReturnType<typeof saveOrganization>>;
export type OpenOrganizationAction = Readonly<ReturnType<typeof openOrganization>>;

// tslint:disable-next-line:typedef
export const saveOrganization = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION, { organization })
);

// tslint:disable-next-line:typedef
export const openOrganization = (organizationId: string) => (
    helpers.makeAction(constants.OPEN_ORGANIZATION, { organizationId })
);

export type OrganizationAction =
    SaveOrganizationAction |
    OpenOrganizationAction |
    ClearAllUserDataAction;