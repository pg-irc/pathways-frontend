// tslint:disable:no-expression-statement
import { toHumanServiceData } from '../to_human_service_data';
import { aString, aNumber } from '../../../helpers/random_test_values';

describe('Adapting search result to service data', () => {

    describe('with valid data', () => {

        it('returns human service when both latitude and longitude are numbers', () => {
            const latitude = aNumber();
            const longitude = aNumber();
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
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
                    lat: latitude,
                    lng: longitude,
                },
            });
            expect(result.latlong.lat).toEqual(latitude);
            expect(result.latlong.lng).toEqual(longitude);
        });

        it('human service returns with undefined latlong if latitude and longitude were both empty string', () => {
            const result = toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
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
            });
            expect(result.latlong).toEqual(undefined);
        });
    });
    describe('with invalid data', () => {
        it('throws error when latitude type and longitude type do not match', () => {
            expect(() => toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
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
                    lat: aString(),
                    lng: aNumber(),
                },
            })).toThrowError('Invalid types for lat/long in search result');
        });

        it('throws error on non empty strings in both latitude and longitude', () => {
            expect(() => toHumanServiceData({
                type: 'SearchServiceData',
                service_name: aString(),
                service_id: aString(),
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
                    lat: 'not an empty string',
                    lng: 'not an empty string',
                },
            })).toThrowError('Invalid types for lat/long in search result');
        });
    });
});
