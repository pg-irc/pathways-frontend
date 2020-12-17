// tslint:disable:no-let no-expression-statement typedef
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { SaveOrganizationAction } from '../organization/actions';

describe('organizations reducer', () => {
    const oldOrganizationBuilder = new HumanOrganizationDataBuilder();
    const theStore: OrganizationStore = buildNormalizedOrganizations([oldOrganizationBuilder]);

    describe('when sending a save search organization action', () => {

        it('updates the store with the new organization in addition to old Organization', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: SaveOrganizationAction = {
                type: constants.SAVE_ORGANIZATION,
                payload: {
                    organization: newOrganization,
                },
            };
            const store = reducer(theStore, action);
            const storeNewOrganization = store.organizations[newOrganization.id];
            const storeOldOrganization = store.organizations[oldOrganizationBuilder.id];
            expect(storeNewOrganization).toEqual(newOrganization);
            expect(storeOldOrganization).toEqual(oldOrganizationBuilder.build());
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