// tslint:disable:no-expression-statement
import { shouldSendServicesReport } from '../analytics';
import { aNumber } from '../../helpers/random_test_values';

describe('Analytics memory report middleware helpers', () => {

    describe('shouldSendServicesReport()', () => {

        it('returns true when the new services count passes the threshold', () => {
            const oldServicesCount = 8;
            const newServicesCount = 12;
            const sendEveryCount = 10;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(true);
        });

        it('returns true when the new services count equals the threshold', () => {
            const oldServicesCount = 9;
            const newServicesCount = 10;
            const sendEveryCount = 10;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(true);
        });

        it('returns false when the new services count equals the old services count', () => {
            const oldServicesCount = 9;
            const newServicesCount = 9;
            const sendEveryCount = 10;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(false);
        });

        it('returns false when the new services count is less than the old services count', () => {
            const oldServicesCount = 12;
            const newServicesCount = 8;
            const sendEveryCount = aNumber();
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(false);
        });

    });
});