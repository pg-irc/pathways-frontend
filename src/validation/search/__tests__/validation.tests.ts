// tslint:disable:no-expression-statement
import { toValidSearchData, toGeoCoderLatLong } from '..';
import { aString, aNumber } from '../../../helpers/random_test_values';

describe('Search response validation', () => {

    describe('with valid data', () => {

        it('returns the service data', () => {
            const serviceId = aString();
            const result = toValidSearchData([{
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
    });
    describe('with invalid data', () => {
        it('throws on missing field in service data', () => {
            const validationResult = toValidSearchData([{
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
            const validationResult = toValidSearchData([{
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

describe('GeoCoder response validation', () => {
    describe('with valid data', () => {
        it('returns lat long', () => {
            const result = toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                'longt': '-117.795094',
                'postal': 'V0G1R0',
                'latt': '50.237690',
            });
            expect(result.lat).toEqual(50.237690);
            expect(result.lng).toEqual(-117.795094);
        });
    });
    describe('with invalid data', () => {
        it('throws on missing field', () => {
            expect(() => toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                // 'longt': '-117.795094',
                'postal': 'V0G1R0',
                'latt': '50.237690',
            })).toThrowError('longt');
        });

        it('throws on field of wrong type', () => {
            expect(() => toGeoCoderLatLong({
                'standard': {
                    'staddress': {},
                    'stnumber': {},
                    'prov': 'BC',
                    'city': 'Nakusp',
                    'confidence': '0.9',
                },
                'Dissemination_Area': {
                    'adauid': '59030002',
                    'dauid': '59030131',
                },
                'longt': '-117.795094',
                'latt': 'not a valid number',
                'postal': 'V0G1R0',
            })).toThrow('latt');
        });
    });
});
