// tslint:disable:no-expression-statement
import { toValidSearchHit, toGeoCoderLatLong } from '../api/validation';
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';

describe('Search response validation', () => {

    describe('with valid data', () => {

        it('returns the service data', () => {
            const serviceId = aString();
            const result = toValidSearchHit({
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
            });
            if (result.type !== 'ServiceSearchItem') {
                throw Error('Unexpected type');
            }
            expect(result.service_id).toEqual(serviceId);
        });

        it('returns the organization data', () => {
            const organizationName = aString();
            const result = toValidSearchHit({
                organization_id: aString(),
                organization_name: organizationName,
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            });
            if (result.type !== 'OrganizationSearchItem') {
                throw Error('Unexpected type');
            }
            expect(result.organization_name).toEqual(organizationName);
        });
    });
    describe('with invalid data', () => {
        it('throws on missing field in service data', () => {
            expect(() => toValidSearchHit({
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
            })).toThrow('service_id');
        });

        it('throws on wrong field type in service data', () => {
            const invalidValue = aNumber();
            expect(() => toValidSearchHit({
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
            })).toThrowError('service_id');
        });

        it('throws on missing field in organization data', () => {
            expect(() => toValidSearchHit({
                organization_id: aString(),
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            })).toThrowError('organization_name');
        });

        it('throws on wrong field type in organization data', () => {
            const invalidData = aNumber();
            expect(() => toValidSearchHit({
                organization_id: aString(),
                organization_name: invalidData,
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            })).toThrowError('organization_name');
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
            expect(result.latitude).toEqual(50.237690);
            expect(result.longitude).toEqual(-117.795094);
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
