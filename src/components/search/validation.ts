// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { ServiceSearchHit, OrganizationSearchHit, UnvalidatedData, SearchHit } from './types';

export const toValidSearchHit = (data: UnvalidatedData): SearchHit => {
    if (isServiceHit(data)) {
        return toServiceHit(data);
    }
    if (isOrganizationHit(data)) {
        return toOrganizationHit(data);
    }
    throw new Error('Search response failed validation as service or organization data');
};

const isServiceHit = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.serviceSearchItem, data) as boolean;
};

const toServiceHit = (data: UnvalidatedData): ServiceSearchHit => {
    const buildServiceSearchItem = (item: UnvalidatedData): ServiceSearchHit => ({
        type: 'ServiceSearchItem',
        service_id: item.service_id,
        service_name: item.service_name,
        service_description: item.service_description,
        street_address: item.street_address,
        city: item.city,
        postal_code: item.postal_code,
        latitude: item._geoloc.lat,
        longitude: item._geoloc.lng,
    });
    return buildServiceSearchItem(data);
};

const isOrganizationHit = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.organizationSearchItem, data) as boolean;
};

const toOrganizationHit = (data: UnvalidatedData): OrganizationSearchHit => {
    const buildOrganizationSearchItem = (item: UnvalidatedData): OrganizationSearchHit => ({
        type: 'OrganizationSearchItem',
        organization_id: 'TODO',
        organization_name: item.organization_name,
        organization_description: item.organization_description,
        organization_website: item.organization_website,
        organization_email: item.organization_email,
    });
    return buildOrganizationSearchItem(data);
};
