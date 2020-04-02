// tslint:disable:no-expression-statement
import { shouldSendServicesReport } from '../analytics/middleware';
import { aNumber } from '../../helpers/random_test_values';

describe('Analytics memory report middleware helpers', () => {

    describe('shouldSendServicesReport()', () => {

        it('returns false when the new service count does not pass the threshold', () => {
            const oldServicesCount = 8;
            const newServicesCount = 9;
            const sendEveryCount = 10;
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(false);
        });

        it('returns true when the new services count passes the threshold', () => {
            const oldServicesCount = 8;
            const newServicesCount = 12;
            const sendEveryCount = 10;
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(true);
        });

        it('returns true when the new services count equals the threshold', () => {
            const oldServicesCount = 9;
            const newServicesCount = 10;
            const sendEveryCount = 10;
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(true);
        });

        it('returns false when the new services count equals the old services count', () => {
            const oldServicesCount = 9;
            const newServicesCount = 9;
            const sendEveryCount = 10;
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(false);
        });

        it('returns false when the new services count is less than the old services count', () => {
            const oldServicesCount = 12;
            const newServicesCount = 8;
            const sendEveryCount = aNumber();
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(false);
        });

        it('returns false when analyticsIsDisabled is true', () => {
            const oldServicesCount = 9;
            const newServicesCount = 10;
            const sendEveryCount = 10;
            const analyticsIsDisabled = true;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(false);
        });

        it('returns true when analyticsIsDisabled is false', () => {
            const oldServicesCount = 9;
            const newServicesCount = 10;
            const sendEveryCount = 10;
            const analyticsIsDisabled = false;
            expect(shouldSendServicesReport(oldServicesCount, newServicesCount, sendEveryCount, analyticsIsDisabled)).toBe(true);
        });
    });
});
