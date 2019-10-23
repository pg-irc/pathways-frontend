import { HumanServiceData } from './types';
import { serviceAtLocationArray } from './schema';

// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

// tslint:disable-next-line:no-any
export const validateServicesAtLocationArray = (data: any): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(serviceAtLocationArray, data) as boolean;
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

export interface ValidationResult {
    readonly isValid: boolean;
    readonly validData?: ReadonlyArray<HumanServiceData>;
    readonly errors?: string;
}
