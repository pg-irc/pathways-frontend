// tslint:disable:no-expression-statement
import { validateAlertResponse } from '..';
import { aString } from '../../../application/helpers/random_test_values';

describe('Alert response validation', () => {
    describe('with valid data', () => {
        it('returns alert', () => {
            const validAlertResponse: ReadonlyArray<any> = [{
                'id': aString(),
                'heading': aString(),
                'content': aString(),
            }];
            const validator = validateAlertResponse(validAlertResponse);
            expect(validator.isValid).toBe(true);
            expect(validator.validData).toBe(validAlertResponse);
        });
        it('returns empty array', () => {
            const validAlertResponse: ReadonlyArray<any> = [];
            const validator = validateAlertResponse(validAlertResponse);
            expect(validator.isValid).toBe(true);
            expect(validator.validData).toBe(validAlertResponse);
        });
    });
    describe('with invalid data', () => {
        it('returns invalid and undefined', () => {
            const invalidAlertResponse: ReadonlyArray<any> = [{
                // 'id': aString(),
                'heading': aString(),
                'content': aString(),
            }];
            const validator = validateAlertResponse(invalidAlertResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            console.log(validator.errors);
        });
        it('returns invalid entries invalidates entire array', () => {
            const invalidAlertResponse: ReadonlyArray<any> = [
                {
                    'id': aString(),
                    'heading': aString(),
                    'content': aString(),
                },
                {
                    // 'id': aString(),
                    'heading': aString(),
                    'content': aString(),
                }];
            const validator = validateAlertResponse(invalidAlertResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            expect(validator.errors);
        });
    });
});
