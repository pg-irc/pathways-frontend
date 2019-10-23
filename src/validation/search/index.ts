// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');
import * as schema from './schema';
import { SearchServiceData, UnvalidatedData } from './types';

export const validateServiceSearchResponse = (data: ReadonlyArray<UnvalidatedData>): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema.serviceSearchItemArray, data);
    return isValid ? { isValid, validData: data } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

// TODO make this a template on SearchServiceData
export interface ValidationResult {
    readonly isValid: boolean;
    readonly validData?: ReadonlyArray<SearchServiceData>;
    readonly errors?: string;
}
