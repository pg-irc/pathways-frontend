// tslint:disable:no-var-requires no-any
import { HumanOrganizationData } from './types';
import { ValidationResult } from '../validation_result';
import { organizationArray } from './schema';
const Ajv = require('ajv');

export const validateOrganizationResponse = (data: ReadonlyArray<any>): ValidationResult<HumanOrganizationData> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(organizationArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};