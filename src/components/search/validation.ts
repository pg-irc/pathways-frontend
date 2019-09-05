// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { ServiceSearchHit, OrganizationSearchHit, UnvalidatedData, SearchHit, LatLong } from './types';

export const toValidSearchHit = (hit: UnvalidatedData): SearchHit => {
    const serviceError = getServiceErrorIfAny(hit);
    if (!serviceError) {
        return toServiceHit(hit);
    }

    const organizationError = getOrganizationErrorIfAny(hit);
    if (!organizationError) {
        return toOrganizationHit(hit);
    }

    throw new Error(JSON.stringify({ serviceError, organizationError }));
};

const getServiceErrorIfAny = (hit: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.serviceSearchItem, hit);
    return isValid ? undefined : ajv.errors;
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

const getOrganizationErrorIfAny = (hit: UnvalidatedData): ReadonlyArray<Object> | undefined => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.organizationSearchItem, hit);
    return isValid ? undefined : ajv.errors;
};

const toOrganizationHit = (hit: UnvalidatedData): OrganizationSearchHit => ({
    type: 'OrganizationSearchItem',
    organization_id: hit.organization_id,
    organization_name: hit.organization_name,
    organization_description: hit.organization_description,
    organization_website: hit.organization_website,
    organization_email: hit.organization_email,
});

export const toGeoCoderLatLong = (data: UnvalidatedData): LatLong => {
    const geoCoderError = getGeoCoderLatLongErrorsIfAny(data);

    if (geoCoderError) {
        throw new Error(JSON.stringify(geoCoderError));
    }

    const latitude = parseFloat(data.latt);
    const longitude = parseFloat(data.longt);

    const isValidNumber = (n: number): boolean => (
        !isNaN(n) && isFinite(n)
    );

    if (!isValidNumber(latitude)) {
        throw new Error('GeoCoder field "latt" is not a number');
    }

    if (!isValidNumber(longitude)) {
        throw new Error('GeoCoder field "longt" is not a number');
    }

    return { latitude, longitude };
};

const getGeoCoderLatLongErrorsIfAny = (hit: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.geoCoderResponse, hit);
    return isValid ? undefined : ajv.errors;
};
