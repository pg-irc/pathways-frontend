// tslint:disable:no-expression-statement
import { shouldSendServicesReport } from '../analytics';
import { aNumber } from '../../helpers/random_test_values';

describe('Analytics memory report middleware helpers', () => {

    describe('shouldSendServicesReport()', () => {

        it('returns true when the new services count passes the provided threshold', () => {
            const oldServicesCount = 0;
            const newServicesCount = 2;
            const sendEveryCount = 1;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(true);
        });

        it('returns true when the new services count equals the provided threshold', () => {
            const oldServicesCount = 0;
            const newServicesCount = 1;
            const sendEveryCount = 1;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(true);
        });

        it('returns false when the new services count equals the old services count', () => {
            const oldServicesCount = 1;
            const newServicesCount = 1;
            const sendEveryCount = aNumber();
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(false);
        });

        it('returns false when the new services count is less than the old services count', () => {
            const oldServicesCount = 1;
            const newServicesCount = 0;
            const sendEveryCount = aNumber();
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount)).toBe(false);
        });

    });
});