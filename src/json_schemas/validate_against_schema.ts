import Ajv from 'ajv';
import { servicesAtLocationSchema } from './services_at_location';

export const isValidServiceAtLocationSchema = (data: any): boolean => { // tslint:disable-line:no-any
    const ajv = new Ajv();
    return ajv.validate(servicesAtLocationSchema, data) as boolean;
};
