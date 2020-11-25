// tslint:disable:no-var-requires
import * as schema from './schema';
import { LatLong } from './types';
const Ajv = require('ajv');

// tslint:disable-next-line:no-any
export const toGeoCoderLatLong = (data: any): LatLong => {
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

    // tslint:disable-next-line: no-expression-statement
    console.log(`Geocoder got ${latitude}, ${longitude}`);

    return { lat: latitude, lng: longitude };
};

// tslint:disable-next-line:no-any
const getGeoCoderLatLongErrorsIfAny = (hit: any): boolean => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.geoCoderResponse, hit);
    return isValid ? undefined : ajv.errors;
};
