// tslint:disable:no-expression-statement
import { validateServiceSearchResponse } from '..';
import { aString, aNumber } from '../../../helpers/random_test_values';

describe('Search response validation', () => {

    describe('with valid data', () => {

        it('returns the service data', () => {
            const serviceId = aString();
            const result = validateServiceSearchResponse([{
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
            }]);
            expect(result.validData[0].service_id).toEqual(serviceId);
        });
        it('empty string lat long are valid', () => {
            const serviceId = aString();
            const result = validateServiceSearchResponse([{
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
                    lat: '',
                    lng: '',
                },
            }]);
            expect(result.validData[0].service_id).toEqual(serviceId);
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
        it('throws on random string for latlong', () => {
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
                    lat: aString(),
                    lng: aString(),
                },
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });
        it('throws on lat long types does not match', () => {
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
                    lat: aString(),
                    lng: aNumber(),
                },
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });
    });
});
