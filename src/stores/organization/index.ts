import * as constants from '../../application/constants';
import { OrganizationStore } from '../../validation/organizations/types';
import { OrganizationAction, SaveOrganizationAction } from './actions';
export { OrganizationStore };

export const buildDefaultStore = (): OrganizationStore => ({
    organizations: {},
    organizationStatus: { type: 'ORGANIZATION:LOADING'},
});

export const reducer = (store: OrganizationStore = buildDefaultStore(), action?: OrganizationAction): OrganizationStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_ORGANIZATION:
            return saveOrganization(store, action);
        case constants.LOADING_ORGANIZATION:
            return {
                ...store,
                organizationStatus: {
                    type: constants.LOADING_ORGANIZATION,
                },
            };
        case constants.VALID_ORGANIZATION:
            return {
                ...store,
                organizationStatus: {
                    type: constants.VALID_ORGANIZATION,
                    organizationId: action.payload.organizationId,
                },
            };
        case constants.ERROR_ORGANIZATION:
            return {
                ...store,
                organizationStatus: {
                    type: constants.ERROR_ORGANIZATION,
                    errorMessageType: action.payload.errorMessageType,
                },
            };
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