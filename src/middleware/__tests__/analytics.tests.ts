// tslint:disable:no-expression-statement
import { computeNumberOfServicesAdded } from '../analytics';
import { ServiceBuilder, buildNormalizedServices } from '../../stores/__tests__/helpers/services_helpers';
import { buildDefaultStore } from '../../stores/services';

describe('Analytics memory report middleware helpers', () => {

    describe('serviceWasAdded()', () => {

        it('returns true when next service store state has a new service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const storeWithNoServices = buildDefaultStore();
            const storeWithOneService = buildNormalizedServices([aServiceBuilder], []);
            expect(computeNumberOfServicesAdded(storeWithNoServices, storeWithOneService)).toEqual(1);
        });

        it('returns false when next service store state has different services', () => {
            const aServiceBuilder = new ServiceBuilder();
            const storeWithOneService = buildNormalizedServices([aServiceBuilder], []);
            const storeWithNoServices = buildDefaultStore();
            expect(computeNumberOfServicesAdded(storeWithOneService, storeWithNoServices)).toEqual(0);
        });

        it('returns false when next service store state matches current state', () => {
            const currentState = buildDefaultStore();
            expect(computeNumberOfServicesAdded(currentState, currentState)).toEqual(0);
        });
    });
});