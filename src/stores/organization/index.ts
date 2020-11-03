import * as constants from '../../application/constants';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { SearchServiceData } from '../../validation/search/types';
import * as helpers from '../helpers/make_action';
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

export interface OrganizationStore {
    readonly organization: HumanOrganizationData;
    readonly organizationServices: ReadonlyArray<SearchServiceData>;
}

export const buildDefaultStore = (): OrganizationStore => ({
    organization: undefined,
    organizationServices: [],
});

export const reducer = (store: OrganizationStore = buildDefaultStore(), action?: OrganizationAction): OrganizationStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_ORGANIZATION:
            return ({
                ...store,
                organization: action.payload.organization,
            });
        case constants.SAVE_ORGANIZATION_SERVICES:
            return ({
                ...store,
                organizationServices: action.payload.organizationServices,
            });
        case constants.CLEAR_ALL_USER_DATA:
            return buildDefaultStore();
        default:
            return store;
    }
};