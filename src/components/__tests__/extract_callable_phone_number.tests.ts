// tslint:disable: no-expression-statement typedef
import { extractCallablePhoneNumber } from '../phone_numbers/extract_callable_phone_number';

describe('clean phone number', () => {
    it('returns simple phone number unchanged', () => {
        expect(extractCallablePhoneNumber('123-456-7890')).toBe('123-456-7890');
    });
    it('returns phone number without separators unchanged', () => {
        expect(extractCallablePhoneNumber('1234567890')).toBe('1234567890');
    });
    it('returns phone number with area code unchanged', () => {
        expect(extractCallablePhoneNumber('1-345-456-1543')).toBe('1-345-456-1543');
    });
    it('returns just the phone number for number with local', () => {
        expect(extractCallablePhoneNumber('123-456-7890 Local 123')).toBe('123-456-7890');
    });
    it('returns the first number when two given separated by space', () => {
        expect(extractCallablePhoneNumber('123-456-7890 234-567-8909')).toBe('123-456-7890');
    });
    it('returns just the phone number for number with second number in ()', () => {
        expect(extractCallablePhoneNumber('1-800-ADOPT-02 (1-800-236-7802)')).toBe('1-800-ADOPT-02');
    });
    it('returns the phone number for number with letters', () => {
        expect(extractCallablePhoneNumber('1-800-AMNESTY')).toBe('1-800-AMNESTY');
    });
    it('returns the first phone number when given two separated by ;', () => {
        expect(extractCallablePhoneNumber('604-123-4567; 1-800-123-4567')).toBe('604-123-4567');
    });
    it('returns empty string for (none)', () => {
        expect(extractCallablePhoneNumber('(none)')).toBe('');
    });
});
