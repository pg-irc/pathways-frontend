import { HumanOrganizationData } from '../../validation/organizations/types';
import { SearchServiceData } from '../../validation/search/types';
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type SaveOrganizationAction = Readonly<ReturnType<typeof saveOrganization>>;
export type SaveOrganizationServicesAction = Readonly<ReturnType<typeof saveOrganizationServices>>;

// tslint:disable-next-line:typedef
export const saveOrganization = (organization: HumanOrganizationData) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION, { organization })
);

// tslint:disable-next-line:typedef
export const saveOrganizationServices = (organizationServices: ReadonlyArray<SearchServiceData>) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION_SERVICES, { organizationServices })
);

export type OrganizationAction =
    SaveOrganizationAction |
    SaveOrganizationServicesAction |
    ClearAllUserDataAction;