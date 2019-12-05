// tslint:disable:no-expression-statement
import { SAVE_SERVICE_FROM_SEARCH, LOAD_SERVICES_SUCCESS, LOAD_SERVICES_REQUEST } from '../../application/constants';
import { countNewServicesToBeCreatedByAction, countTotalServicesAfterActionFinishes, shouldSendServicesCountReport  } from '../google_analytics';
import { ServiceBuilder, buildNormalizedServices } from '../../stores/__tests__/helpers/services_helpers';
import { buildDefaultStore } from '../../stores';
import { aNumber } from '../../helpers/random_test_values';

describe('Google Analytics memory report middleware helpers', () => {

    describe('countNewServicesToBeCreatedByAction()', () => {

        it('returns expected count with SAVE_SERVICE_FROM_SEARCH action and new service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const action = {
                type: SAVE_SERVICE_FROM_SEARCH,
                payload: {
                    service: new ServiceBuilder().build(),
                },
            };
            expect(countNewServicesToBeCreatedByAction(action, store)).toEqual(1);
        });

        it('returns expected count with SAVE_SERVICE_FROM_SEARCH action and an existing service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const action = {
                type: SAVE_SERVICE_FROM_SEARCH,
                payload: {
                    service: aServiceBuilder.build(),
                },
            };
            expect(countNewServicesToBeCreatedByAction(action, store)).toEqual(0);
        });

        it('returns expected count with LOAD_SERVICES_SUCCESS action and new service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const action = {
                type: LOAD_SERVICES_SUCCESS,
                payload: {
                    services: [new ServiceBuilder().build()],
                },
            };
            expect(countNewServicesToBeCreatedByAction(action, store)).toEqual(1);
        });

        it('returns expected count with LOAD_SERVICES_SUCCESS action and an existing service', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const action = {
                type: LOAD_SERVICES_SUCCESS,
                payload: {
                    services: [aServiceBuilder.build()],
                },
            };
            expect(countNewServicesToBeCreatedByAction(action, store)).toEqual(0);
        });

        it('returns 0 when action is of invalid type', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const action = {
                type: LOAD_SERVICES_REQUEST,
            };
            expect(countNewServicesToBeCreatedByAction(action, store)).toEqual(0);
        });
    });

    describe('countTotalServicesAfterActionFinishes()', () => {

        it ('returns the sum of new services count and existing store services count', () => {
            const aServiceBuilder = new ServiceBuilder();
            const store = {
                ...buildDefaultStore(),
                services: buildNormalizedServices([aServiceBuilder], []),
            };
            const newServicesCount = 1;
            expect(countTotalServicesAfterActionFinishes(newServicesCount, store)).toEqual(2);
        });
    });

    describe('shouldSendServicesCountEvent()', () => {

        it ('returns true if new services count is positive and total services count is divisble by send every services count', () => {
            const newServicesCount = aNumber();
            const totalServicesCount = newServicesCount;
            const sendEveryServicesCount = totalServicesCount;
            expect(shouldSendServicesCountReport(newServicesCount, totalServicesCount, sendEveryServicesCount)).toEqual(true);
        });

        it ('returns false if new services count is positive and total services count is not divisible by send every services count', () => {
            const newServicesCount = aNumber();
            const totalServicesCount = newServicesCount;
            const sendEveryServicesCount = totalServicesCount + 1;
            expect(shouldSendServicesCountReport(newServicesCount, totalServicesCount, sendEveryServicesCount)).toEqual(false);
        });

        it ('returns false if new services count is 0', () => {
            const newServicesCount = 0;
            expect(shouldSendServicesCountReport(newServicesCount, aNumber(), aNumber())).toEqual(false);
        });

    });
});