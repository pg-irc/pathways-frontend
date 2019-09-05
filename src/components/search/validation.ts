// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { ServiceSearchHit, OrganizationSearchHit, UnvalidatedData, SearchHit } from './types';

export const toValidSearchHit = (hit: UnvalidatedData): SearchHit => {
    if (isServiceHit(hit)) {
        return toServiceHit(hit);
    }
    if (isOrganizationHit(hit)) {
        return toOrganizationHit(hit);
    }
    throw new Error('Search response failed validation as service or organization data');
};

const isServiceHit = (hit: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.serviceSearchItem, hit) as boolean;
};

const toServiceHit = (hit: UnvalidatedData): ServiceSearchHit => ({
    type: 'ServiceSearchItem',
    service_id: hit.service_id,
    service_name: hit.service_name,
    service_description: hit.service_description,
    street_address: hit.street_address,
    city: hit.city,
    postal_code: hit.postal_code,
    latitude: hit._geoloc.lat,
    longitude: hit._geoloc.lng,
});

const isOrganizationHit = (hit: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(schema.organizationSearchItem, hit) as boolean;
};

const toOrganizationHit = (hit: UnvalidatedData): OrganizationSearchHit => ({
    type: 'OrganizationSearchItem',
    organization_id: hit.organization_id,
    organization_name: hit.organization_name,
    organization_description: hit.organization_description,
    organization_website: hit.organization_website,
    organization_email: hit.organization_email,
});
