// tslint:disable: no-expression-statement typedef
import { cleanPhoneNumber } from '../phone_numbers/clean_phone_number';

describe('clean phone number', () => {
    it('returns simple phone number unchanged', () => {
        expect(cleanPhoneNumber('123-456-7890')).toBe('123-456-7890');
    });
    it('returns phone number without separators unchanged', () => {
        expect(cleanPhoneNumber('1234567890')).toBe('1234567890');
    });
    it('returns 1-800 phone number unchanged', () => {
        expect(cleanPhoneNumber('1-345-456-1543')).toBe('1-345-456-1543');
    });
    it('returns just the phone number for number with local', () => {
        expect(cleanPhoneNumber('123-456-7890 Local 123')).toBe('123-456-7890');
    });
    it('returns just the phone number for number with second number in ()', () => {
        expect(cleanPhoneNumber('1-800-ADOPT-02 (1-800-236-7802)')).toBe('1-800-ADOPT-02');
    });
    it('returns the phone number for number with letters', () => {
        expect(cleanPhoneNumber('1-800-AMNESTY')).toBe('1-800-AMNESTY');
    });
    it('returns the first phone number when given two separated by ;', () => {
        expect(cleanPhoneNumber('604-123-4567; 1-800-123-4567')).toBe('604-123-4567');
    });
    it('returns empty string for (none)', () => {
        expect(cleanPhoneNumber('(none)')).toBe('');
    });
});
