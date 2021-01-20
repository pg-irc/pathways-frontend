import * as constants from '../../application/constants';
import { OrganizationStore } from '../../validation/organizations/types';
import { OrganizationAction, OrganizationSuccessAction } from './actions';
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
        case constants.LOAD_ORGANIZATION_REQUEST:
            return {
                ...store,
                organizationStatus: {
                    type: constants.LOADING_ORGANIZATION,
                },
            };
        case constants.LOAD_ORGANIZATION_SUCCESS:
            return saveOrganization(store, action);
        case constants.LOAD_ORGANIZATION_FAILURE:
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

const saveOrganization = (store: OrganizationStore, action: OrganizationSuccessAction): OrganizationStore => ({
    ...store,
    organizations: {
        ...store.organizations,
        [action.payload.organization.id]: action.payload.organization,
    },
    organizationStatus: {
        type: constants.VALID_ORGANIZATION,
    },
});