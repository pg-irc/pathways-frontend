// tslint:disable:no-var-requires no-any
import { Alert } from './types';
import { ValidationResult } from '../validation_result';
import { alertArray } from './schema';
const Ajv = require('ajv');

export const validateAlertResponse = (data: ReadonlyArray<any>): ValidationResult<Alert> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(alertArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};