// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { SearchServiceData, UnvalidatedData, LatLong } from './types';

// TODO rename to validateServiceSearchResponse
export const toValidSearchData = (data: ReadonlyArray<UnvalidatedData>): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.serviceSearchItemArray, data);
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

// TODO make this a template on SearchServiceData
export interface ValidationResult {
    readonly isValid: boolean;
    readonly validData?: ReadonlyArray<SearchServiceData>;
    readonly errors?: string;
}

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
