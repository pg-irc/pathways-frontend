// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { UnvalidatedData, SearchServiceData, LatLong } from './types';

export const toValidSearchData = (hit: UnvalidatedData): SearchServiceData => {
    const serviceErrors = getSearchServiceDataErrors(hit);
    if (!serviceErrors) {
        return toValidSearchServiceData(hit);
    }

    throw new Error(JSON.stringify({ serviceErrors }));
};

const getSearchServiceDataErrors = (hit: UnvalidatedData): ReadonlyArray<Object> | undefined => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.serviceSearchItem, hit);
    return isValid ? undefined : ajv.errors;
};

const toValidSearchServiceData = (hit: UnvalidatedData): SearchServiceData => ({
    type: 'ServiceSearchItem',
    service_id: hit.service_id,
    service_name: hit.service_name,
    service_description: hit.service_description,

    organization_name: hit.organization.name,
    organization_website: hit.organization.website,
    organization_email: hit.organization.email,
    street_address: hit.address.address,
    city: hit.address.city,
    province: hit.address.state_province,
    postal_code: hit.address.postal_code,
    country: hit.address.country,

    latitude: hit._geoloc.lat,
    longitude: hit._geoloc.lng,
});

export const toGeoCoderLatLong = (data: UnvalidatedData): LatLong => {
    const validationError = getGeoCoderLatLongErrorsIfAny(data);

    if (validationError) {
        throw new Error(JSON.stringify(validationError));
    }

    const latitude = parseFloat(data.latt);
    const longitude = parseFloat(data.longt);

    return toValidLatLong(latitude, longitude);
};

const toValidLatLong = (latitude: number, longitude: number): LatLong => {
    const isValidNumber = (n: number): boolean => (
        !isNaN(n) && isFinite(n)
    );

    if (!isValidNumber(latitude)) {
        throw new Error(`GeoCoder field "latt" is not a number: ${latitude}`);
    }

    if (!isValidNumber(longitude)) {
        throw new Error(`GeoCoder field "longt" is not a number: ${longitude}`);
    }

    return { latitude, longitude };
};

const getGeoCoderLatLongErrorsIfAny = (hit: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.geoCoderResponse, hit);
    return isValid ? undefined : ajv.errors;
};
