// tslint:disable:no-let no-expression-statement
import * as constants from '../../application/constants';
import { OrganizationStore, reducer } from '../organization';
import { ClearAllUserDataAction } from '../questionnaire/actions';
import { buildNormalizedOrganizations, HumanOrganizationDataBuilder } from './helpers/organization_helpers';
import { SaveOrganizationAction, SaveOrganizationServicesAction } from '../organization/action';
import { SearchServiceData } from '../../validation/search/types';
import { aString } from '../../application/helpers/random_test_values';
import { aGeoLocation, anAddress, anOrganization } from '../../validation/search/__tests__/helpers/search_schema';

describe('organizations reducer', () => {
    const anOrganizationData = new HumanOrganizationDataBuilder();
    const theStore: OrganizationStore = buildNormalizedOrganizations([anOrganizationData], []);

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

    describe('when sending a save search organization action', () => {

        it('updates the store with the new organization', () => {
            const organizationServices: ReadonlyArray<SearchServiceData> = [{
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
                email: aString(),
            }];
            const action: SaveOrganizationServicesAction = {
                type: constants.SAVE_ORGANIZATION_SERVICES,
                payload: {
                    organizationServices: organizationServices,
                },
            };
            const store = reducer(theStore, action);
            const storeOrganizationServices = store.organizationServices[0];
            expect(store.organizationServices.length).toEqual(1);
            expect(storeOrganizationServices).toEqual(organizationServices[0]);
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
