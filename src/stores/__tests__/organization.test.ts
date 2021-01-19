// tslint:disable:no-let no-expression-statement typedef
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { ErrorOrganizationAction, LoadingOrganizationAction, SaveOrganizationAction } from '../organization/actions';
import { Errors } from '../../validation/errors/types';

describe('organizations reducer', () => {
    const oldOrganizationBuilder = new HumanOrganizationDataBuilder();
    const theStore: OrganizationStore = buildNormalizedOrganizations([oldOrganizationBuilder]);

    describe('when load organization request is called', () => {
        it('set the organizationStatus to loading', () => {
            const action: LoadingOrganizationAction = {
                type: constants.LOAD_ORGANIZATION_REQUEST,
            };
            const store = reducer(theStore, action);
            expect(store.organizationStatus.type).toEqual(constants.LOADING_ORGANIZATION);
        });

    });

    describe('when load organization is successful', () => {
        it('updates the store with the new organization in addition to old Organization', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: SaveOrganizationAction = {
                type: constants.LOAD_ORGANIZATION_SUCCESS,
                payload: {
                    organization: newOrganization,
                },
            };
            const store = reducer(theStore, action);
            const storeNewOrganization = store.organizations[newOrganization.id];
            const storeOldOrganization = store.organizations[oldOrganizationBuilder.id];
            expect(storeNewOrganization).toEqual(newOrganization);
            expect(storeOldOrganization).toEqual(oldOrganizationBuilder.build());
            expect(store.organizationStatus.type).toEqual(constants.VALID_ORGANIZATION);
        });
    });

    describe('when load organization ends in error', () => {
        it('updates the store with the new organization in addition to old Organization', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: ErrorOrganizationAction = {
                type: constants.LOAD_ORGANIZATION_FAILURE,
                payload: {
                    organizationId: newOrganization.id,
                    errorMessageType: Errors.Offline,
                },
            };
            const store = reducer(theStore, action);
            expect(store.organizationStatus.type).toEqual(constants.ERROR_ORGANIZATION);
        });
    });

    describe('when clear all user data action is dispatched', () => {
        it('removes organizations from organization map', () => {
            const organizationBuilder = new HumanOrganizationDataBuilder();
            const store = buildNormalizedOrganizations([organizationBuilder]);
            const action: ClearAllUserDataAction = {
                type: constants.CLEAR_ALL_USER_DATA,
            };
            const storeState = reducer(store, action);
            expect(storeState.organizations).toEqual({});
        });
    });

});
