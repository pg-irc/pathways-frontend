// tslint:disable:no-var-requires no-any
const Ajv = require('ajv');
import { HumanServiceData } from './types';
import { serviceAtLocationArray } from './schema';
import { ValidationResult } from '../validation_result';

export const validateServicesAtLocationArray = (data: ReadonlyArray<any>): ValidationResult<HumanServiceData> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceAtLocationArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};
