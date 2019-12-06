// tslint:disable:no-expression-statement
import { serviceWasAdded, isDivisable } from '../analytics';
import { ServiceBuilder, buildNormalizedServices } from '../../stores/__tests__/helpers/services_helpers';
import { buildDefaultStore } from '../../stores/services';
import { aNumber } from '../../helpers/random_test_values';

describe('Analytics memory report middleware helpers', () => {

    describe('serviceWasAdded()', () => {

        it('returns true when next service store state has a new service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const currentState = buildDefaultStore();
            const nextState = buildNormalizedServices([aServiceBuilder], []);
            expect(serviceWasAdded(currentState, nextState)).toEqual(true);
        });

        it('returns false when next service store state has different services', () => {
            const aServiceBuilder = new ServiceBuilder();
            const currentState = buildNormalizedServices([aServiceBuilder], []);
            const nextState = buildDefaultStore();
            expect(serviceWasAdded(currentState, nextState)).toEqual(false);
        });

        it('returns false when next service store state matches current state', () => {
            const currentState = buildDefaultStore();
            const nextState = currentState;
            expect(serviceWasAdded(currentState, nextState)).toEqual(false);
        });
    });

    describe('isDivisible()', () => {

        it('returns true when the dividend and divisor are divisible', () => {
            const dividend = aNumber();
            const divisor = dividend;
            expect(isDivisable(dividend, divisor)).toEqual(true);
        });

        it('returns false when the dividend and divisor are not divisible', () => {
            const dividend = aNumber();
            const divisor = dividend + 1;
            expect(isDivisable(dividend, divisor)).toEqual(false);
        });

        it('returns false when the dividend is 0', () => {
            const dividend = 0;
            expect(isDivisable(dividend, aNumber())).toEqual(false);
        });

        it('returns false when the divisor is 0', () => {
            const divisor = 0;
            expect(isDivisable(aNumber(), divisor)).toEqual(false);
        });
    });
});