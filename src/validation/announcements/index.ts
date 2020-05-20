// tslint:disable:no-var-requires no-any
import { Announcement } from './types';
import { ValidationResult } from '../validation_result';
import { announcementArray } from './schema';
const Ajv = require('ajv');

export const validateAnnouncementResponse = (data: ReadonlyArray<any>): ValidationResult<ReadonlyArray<Announcement>> => {
    const ajv = new Ajv();
    const isValid = ajv.validate(announcementArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};