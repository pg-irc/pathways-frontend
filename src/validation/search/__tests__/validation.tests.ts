// tslint:disable:no-expression-statement
import { validateServiceSearchResponse } from '..';
import { aString, aNumber } from '../../../helpers/random_test_values';

describe('Search response validation', () => {

    describe('with valid data', () => {

        it('returns the service data', () => {
            const serviceId = aString();
            // tslint:disable-next-line:no-any
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aString(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }];
            const result = validateServiceSearchResponse(serviceData);
            expect(result.validData).toEqual(serviceData);
        });
    });
    describe('with invalid data', () => {
        it('throws on missing field in service data', () => {
            const validationResult = validateServiceSearchResponse([{
                service_name: aString(),
                // service_id: serviceId,
                service_description: aString(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aNumber(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });

        it('throws on wrong field type in service data', () => {
            const invalidValue = aNumber();
            const validationResult = validateServiceSearchResponse([{
                service_name: aString(),
                service_id: invalidValue,
                service_description: aString(),
                address: {
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
                organization: {
                    id: aNumber(),
                    name: aString(),
                    website: aString(),
                    email: aString(),
                    service_count: aNumber(),
                },
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });
    });
});
