// tslint:disable:no-var-requires no-any
const Ajv = require('ajv');
import { ValidationResult } from '../validation_result';
import { userData } from './schema';
import { PersistedData } from '../../stores/persisted_data';

export const validateUserData = (data: any): ValidationResult<PersistedData> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(userData, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};