// tslint:disable:no-let no-expression-statement typedef
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { OrganizationFailureAction, OrganizationRequestAction, OrganizationSuccessAction } from '../organization/actions';
import { Errors } from '../../validation/errors/types';

describe('organizations reducer', () => {
    const oldOrganizationBuilder = new HumanOrganizationDataBuilder();
    const theStore: OrganizationStore = buildNormalizedOrganizations([oldOrganizationBuilder]);

    it('returns a unmodified store when the action is missing', () => {
        expect(reducer(theStore)).toBe(theStore);
        const storeOldOrganization = theStore.organizations[oldOrganizationBuilder.id];
        expect(storeOldOrganization).toEqual(oldOrganizationBuilder.build());
    });

    describe('when load organization request is called', () => {
        it('set the organizationStatus to loading', () => {
            const action: OrganizationRequestAction = {
                type: constants.LOAD_ORGANIZATION_REQUEST,
            };
            const store = reducer(theStore, action);
            expect(store.organizationStatus).toEqual({ type: constants.LOADING_ORGANIZATION });
        });
    });

    describe('when load organization is successful', () => {
        it('set the organization status to success and add the organization into store', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: OrganizationSuccessAction = {
                type: constants.LOAD_ORGANIZATION_SUCCESS,
                payload: {
                    organization: newOrganization,
                },
            };
            const store = reducer(theStore, action);
            const storeNewOrganization = store.organizations[newOrganization.id];
            expect(storeNewOrganization).toEqual(newOrganization);
            expect(store.organizationStatus).toEqual({ type: constants.VALID_ORGANIZATION });
        });
    });

    describe('when load organization ends in error', () => {
        it('set the organization status to error, set errorMessageType to the error', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: OrganizationFailureAction = {
                type: constants.LOAD_ORGANIZATION_FAILURE,
                payload: {
                    organizationId: newOrganization.id,
                    errorMessageType: Errors.Offline,
                },
            };
            const store = reducer(theStore, action);
            expect(store.organizationStatus).toEqual({ type: constants.ERROR_ORGANIZATION, errorMessageType: Errors.Offline });
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
