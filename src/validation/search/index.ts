// tslint:disable:no-var-requires no-any
import { SearchServiceData } from './types';
import { serviceSearchItemArray } from './schema';
import { ValidationResult } from '../validation_result';
const Ajv = require('ajv');

// TODO add union type for Hits that is either error or success
export const validateServiceSearchResponse = (hits: ReadonlyArray<any>): any => {
    const validationResult = validateServiceSearchHits(hits);
    if (!validationResult.isValid) {
        throw new Error(validationResult.errors);
    }
    return validationResult.validData;
};

export const validateServiceSearchHits = (data: ReadonlyArray<any>): ValidationResult<SearchServiceData> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceSearchItemArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};
