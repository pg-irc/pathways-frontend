// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as R from 'ramda';
import { ServiceSearchItem, OrganizationSearchItem } from './types';
import * as schema from './schema';

// tslint:disable-next-line:no-any
type UnvalidatedData = any;

export type SearchItemList = ReadonlyArray<ServiceSearchItem> | ReadonlyArray<OrganizationSearchItem>;

// tslint:disable-next-line:no-class
export class InvalidSearchResultData {
}

export const validateSearchResponses = (data: UnvalidatedData): SearchItemList => {
    if (isServiceData(data)) {
        return toServiceData(data);
    }
    if (isOrganizationData(data)) {
        return toOrganizationData(data);
    }
    throw new InvalidSearchResultData();
};

const isServiceData = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.serviceSearchItemArray, data) as boolean;
};

const toServiceData = (data: UnvalidatedData): ReadonlyArray<ServiceSearchItem> => {
    const buildServiceSearchItem = (item: UnvalidatedData): ServiceSearchItem => ({
        service_id: item.service_id,
        service_name: item.service_name,
        service_description: item.service_description,
        street_address: item.street_address,
        city: item.city,
        postal_code: item.postal_code,
        _geoloc: {
            lat: item._geoloc.lat,
            lng: item._geoloc.lng,
        },
    });
    return R.map(buildServiceSearchItem, data);
};

const isOrganizationData = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.organizationSearchItemArray, data) as boolean;
};

const toOrganizationData = (data: UnvalidatedData): ReadonlyArray<OrganizationSearchItem> => {
    const buildOrganizationSearchItem = (item: UnvalidatedData): OrganizationSearchItem => ({
        organization_id: 'TODO',
        organization_name: item.organization_name,
        organization_description: item.organization_description,
        organization_website: item.organization_website,
        organization_email: item.organization_email,
    });
    return R.map(buildOrganizationSearchItem, data);
};
