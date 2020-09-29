// tslint:disable:no-expression-statement
import { validateOrganizationResponse } from '..';
import { aString } from '../../../application/helpers/random_test_values';

describe('Organization response validation', () => {
    describe('with valid data', () => {
        it('returns valid organizations', () => {
            const validOrganizationResponse: ReadonlyArray<any> = [{
                id: aString(),
                name: aString(),
                description: aString(),
                website: aString(),
                email: aString(),
            }];
            const validator = validateOrganizationResponse(validOrganizationResponse);
            expect(validator.isValid).toBe(true);
            expect(validator.validData).toBe(validOrganizationResponse);
        });
        it('returns empty array', () => {
            const validOrganizationResponse: ReadonlyArray<any> = [];
            const validator = validateOrganizationResponse(validOrganizationResponse);
            expect(validator.isValid).toBe(true);
            expect(validator.validData).toBe(validOrganizationResponse);
        });
    });
    describe('with invalid data', () => {
        it('returns invalid and undefined', () => {
            const invalidOrganizationResponse: ReadonlyArray<any> = [{
                // id: aString(),
                name: aString(),
                description: aString(),
                website: aString(),
                email: aString(),
            }];
            const validator = validateOrganizationResponse(invalidOrganizationResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            console.log(validator.errors);
        });
        it('returns invalid entries invalidates entire array', () => {
            const invalidOrganizationResponse: ReadonlyArray<any> = [
                {
                    // id: aString(),
                    name: aString(),
                    description: aString(),
                    website: aString(),
                    email: aString(),
                },
                {
                    id: aString(),
                    name: aString(),
                    description: aString(),
                    website: aString(),
                    email: aString(),
                }];
            const validator = validateOrganizationResponse(invalidOrganizationResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            expect(validator.errors);
        });
    });
});
