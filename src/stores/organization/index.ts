import * as constants from '../../application/constants';
import { OrganizationStore } from '../../validation/organizations/types';
import { OrganizationAction, SaveOrganizationAction } from './actions';
export { OrganizationStore };

export const buildDefaultStore = (): OrganizationStore => ({
    organizations: {},
    organizationTab: 0,
});

export const reducer = (store: OrganizationStore = buildDefaultStore(), action?: OrganizationAction): OrganizationStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_ORGANIZATION:
            return saveOrganization(store, action);
        case constants.SAVE_ORGANIZATION_TAB:
            return { ...store, organizationTab: action.payload.index };
        case constants.CLEAR_ALL_USER_DATA:
            return buildDefaultStore();
        default:
            return store;
    }
};

const saveOrganization = (store: OrganizationStore, action: SaveOrganizationAction): OrganizationStore => ({
    ...store,
    organizations: {
        ...store.organizations,
        [action.payload.organization.id]: action.payload.organization,
    },
});