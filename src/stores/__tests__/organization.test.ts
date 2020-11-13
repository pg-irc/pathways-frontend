// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { SaveOrganizationAction } from '../organization/action';

describe('organizations reducer', () => {
    const anOrganization = new HumanOrganizationDataBuilder();
    const theStore: OrganizationStore = buildNormalizedOrganizations([anOrganization]);

    describe('when sending a save search organization action', () => {

        it('updates the store with the new organization', () => {
            const newOrganization = new HumanOrganizationDataBuilder().build();
            const action: SaveOrganizationAction = {
                type: constants.SAVE_ORGANIZATION,
                payload: {
                    organization: newOrganization,
                },
            };
            const store = reducer(theStore, action);
            const storeOrganization = store.organizations[newOrganization.id];
            expect(Object.keys(newOrganization).length).toEqual(5);
            expect(storeOrganization).toEqual(newOrganization);
        });

    });


    describe('when clear all user data action is dispatched', () => {
        const organizationBuilder = new HumanOrganizationDataBuilder();
        const store = buildNormalizedOrganizations([organizationBuilder]);
        const action: ClearAllUserDataAction = {
            type: constants.CLEAR_ALL_USER_DATA,
        };
        const storeState = reducer(store, action);
        it('removes organizations from organization map', () => {
            expect(storeState.organizations).toEqual({});
        });
    });

});
