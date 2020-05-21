// tslint:disable:no-expression-statement
import { validateAlertResponse } from '..';

describe('Alert response validation', () => {
    describe('with valid data', () => {
        it('returns alert', () => {
            const validAlertResponse: ReadonlyArray<any> = [{
                'id': '1',
                'heading': 'dummy heading',
                'content': 'dummy text',
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
                // 'id': '1',
                'heading': 'dummy heading',
                'content': 'dummy text',
            }];
            const validator = validateAlertResponse(invalidAlertResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            console.log(validator.errors);
        });
        it('returns invalid entries invalidates entire array', () => {
            const invalidAlertResponse: ReadonlyArray<any> = [
                {
                    'id': '1',
                    'heading': 'dummy heading',
                    'content': 'dummy text',
                },
                {
                    // 'id': '2',
                    'heading': 'dummy heading2',
                    'content': 'dummy text2',
                }];
            const validator = validateAlertResponse(invalidAlertResponse);
            expect(validator.isValid).toBe(false);
            expect(validator.validData).toBe(undefined);
            expect(validator.errors);
        });
    });
});
