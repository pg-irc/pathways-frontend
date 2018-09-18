import * as Ajv from 'ajv';
import { servicesAtLocationSchema } from './services_at_location';

export const isValidServiceAtLocationSchema = (data: any): boolean => { // tslint:disable-line:no-any
    const ajv = new Ajv();
    // We need to coerce this type as it could be a Promise if we were using async validation.
    return ajv.validate(servicesAtLocationSchema, data) as boolean;
};
