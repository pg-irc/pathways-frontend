// tslint:disable:no-any no-var-requires
// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
const Ajv = require('ajv');
import { serviceAtLocationArray } from '../stores/services';
import { userData as userDataSchema } from '../stores/user_data/schemas';

interface ValidatorResponse {
    readonly isValid: boolean;
    readonly errors?: string;
}

export const servicesAtLocationValidator = (data: any): ValidatorResponse => {
    const ajv = new Ajv();
    const response = {
        isValid: ajv.validate(serviceAtLocationArray, data) as boolean,
    };
    return response.isValid ? response : { ...response, errors: ajv.errorsText(ajv.errors) };
};

export const userDataValidator = (data: any): ValidatorResponse => {
    const ajv = new Ajv();
    const response = {
        isValid: ajv.validate(userDataSchema, data) as boolean,
    };
    return response.isValid ? response : { ...response, errors: ajv.errorsText(ajv.errors) };
};
