// tslint:disable:no-var-requires no-any
const Ajv = require('ajv');
import { serviceMap } from './schema';
import { ValidationResult } from '../../validation_result';
import { ServiceMap } from '../types';

export const validateServiceMap = (data: any): ValidationResult<ServiceMap> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceMap, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};