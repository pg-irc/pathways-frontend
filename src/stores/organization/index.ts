import * as constants from '../../application/constants';
import { OrganizationStore } from '../../validation/organizations/types';
import { OrganizationAction, SaveOrganizationAction } from './action';
export { OrganizationStore };

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
            return saveOrganization(store, action);
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

const saveOrganization = (store: OrganizationStore, action: SaveOrganizationAction): OrganizationStore => ({
    ...store,
    organization: {
        ...store.organization,
        [action.payload.organization.id]: action.payload.organization,
    },
});