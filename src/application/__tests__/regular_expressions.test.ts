// tslint:disable:no-expression-statement
import { phoneNumberRegex } from '../regular_expressions';

describe('phone number regular expression', () => {

    it('matches phone with country code, area code, and number in format: x-xxx-xxx-xxxx', () => {
        expect(phoneNumberRegex.test('1-111-111-1111')).toBe(true);
    });

    it('matches phone with area code and number in format: xxx-xxx-xxxx', () => {
        expect(phoneNumberRegex.test('111-111-1111')).toBe(true);
    });

    it('matches phone with number in format: xxx-xxxx', () => {
        expect(phoneNumberRegex.test('111-1111')).toBe(true);
    });

    it('does not match phone with country code and missing area code in format: x-xxx-xxxx', () => {
        expect(phoneNumberRegex.test('1-111-1111')).toBe(false);
    });

    it('does not match a valid phone preceded by a non numeric value', () => {
        expect(phoneNumberRegex.test('A111-1111')).toBe(false);
    });

    it('does not match a valid phone followed by a non numeric value', () => {
        expect(phoneNumberRegex.test('111-1111A')).toBe(false);
    });

    it('does not match non numeric phone', () => {
        expect(phoneNumberRegex.test('AAA-AAAA')).toBe(false);
    });

    it('does not match phone with no separator', () => {
        expect(phoneNumberRegex.test('1111111')).toBe(false);
    });

    it('does not match phone with space separator', () => {
        expect(phoneNumberRegex.test('111 1111')).toBe(false);
    });
});