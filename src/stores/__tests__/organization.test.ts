// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { SaveOrganizationAction, SaveOrganizationServicesAction } from '../organization/action';
import { SearchServiceData } from '../../validation/search/types';
import { anSearchService } from '../../validation/search/__tests__/helpers/search_schema';

describe('organizations reducer', () => {
    const oldOrganizationBuilder = new HumanOrganizationDataBuilder();
    const oldServices: ReadonlyArray<SearchServiceData> = [anSearchService()];
    const theStore: OrganizationStore = buildNormalizedOrganizations([oldOrganizationBuilder], oldServices);
    const newServices: ReadonlyArray<SearchServiceData> = [anSearchService(), anSearchService()];

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
            expect(Object.keys(newOrganization).length).toEqual(5);
            expect(storeNewOrganization).toEqual(newOrganization);
            expect(storeOldOrganization).toEqual(oldOrganizationBuilder.build());
        });
    });

    describe('when sending a save organization services action', () => {

        it('updates the store with new services replacing the old ones', () => {
            const action: SaveOrganizationServicesAction = {
                type: constants.SAVE_ORGANIZATION_SERVICES,
                payload: {
                    organizationServices: newServices,
                },
            };
            const store = reducer(theStore, action);
            const storeOrganizationServices = store.organizationServices;
            expect(store.organizationServices.length).toEqual(newServices.length);
            expect(storeOrganizationServices).toEqual(newServices);
            expect(store.organizationServices).not.toEqual(oldServices);
            expect(store.organizationServices.length).not.toEqual(oldServices.length);
        });
    });

    describe('when clear all user data action is dispatched', () => {
        const organizationBuilder = new HumanOrganizationDataBuilder();
        const store = buildNormalizedOrganizations([organizationBuilder], []);
        const action: ClearAllUserDataAction = {
            type: constants.CLEAR_ALL_USER_DATA,
        };
        const storeState = reducer(store, action);
        it('removes organizations from organization map', () => {
            expect(storeState.organizations).toEqual({});
        });
    });

});
