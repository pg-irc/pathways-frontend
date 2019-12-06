// tslint:disable:no-expression-statement no-any no-null-keyword
import { validateServiceMap } from '..';
import { ServiceBuilder, buildNormalizedServices } from '../../../../stores/__tests__/helpers/services_helpers';
import { selectSavedServiceMap } from '../../../../selectors/services/select_saved_service_map';
import { buildDefaultStore } from '../../../../stores';

describe('saved service map validation', () => {

    describe('with valid data', () => {

        test('passes on valid service map', () => {
            const validService = new ServiceBuilder().withBookmarked(true).build();
            const validator = validateServiceMap({validService});
            expect(validator.isValid).toBe(true);
        });

        test('passes on empty object', () => {
            const validator = validateServiceMap({});
            expect(validator.isValid).toBe(true);
        });

        test('fails on service map that is not of type object', () => {
            const invalidData: any = [];
            const validator = validateServiceMap(invalidData);
            expect(validator.isValid).toBe(false);
        });
    });

    describe('the saved service map', () => {
        const defaultStore = buildDefaultStore();
        // if this test fails, we have made a change to the schema that may not allow us to restore saved services from disk.
        test('passes with valid schema', () => {
            const aServiceBuilder = new ServiceBuilder();
            const serviceStore = buildNormalizedServices([aServiceBuilder], []);
            const storeState = {
                ...defaultStore,
                services: serviceStore,
            };
            const savedServiceMap = selectSavedServiceMap(storeState);
            const validator = validateServiceMap(savedServiceMap);
            expect(validator.isValid).toBe(true);
       });
    });
});