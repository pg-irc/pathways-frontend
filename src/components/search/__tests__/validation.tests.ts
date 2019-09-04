// tslint:disable:no-expression-statement
import { toValidSearchResponse } from '../validation';
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';

describe('Search response validation', () => {

    describe('with valid data', () => {

        it('returns the service data', () => {
            const serviceId = aString();
            const result = toValidSearchResponse([{
                service_id: serviceId,
                service_name: aString(),
                service_description: aString(),
                street_address: aString(),
                city: aString(),
                postal_code: aString(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }]);
            const resultItem = result[0];
            if (resultItem.type !== 'ServiceSearchItem') {
                throw Error('Unexpected type');
            }
            expect(resultItem.service_id).toEqual(serviceId);
        });

        it('returns the organization data', () => {
            const organizationName = aString();
            const result = toValidSearchResponse([{
                organization_name: organizationName,
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            }]);
            const resultItem = result[0];
            if (resultItem.type !== 'OrganizationSearchItem') {
                throw Error('Unexpected type');
            }
            expect(resultItem.organization_name).toEqual(organizationName);
        });
    });
    describe('with invalid data', () => {
        it('throws on missing field in service data', () => {
            expect(() => toValidSearchResponse([{
                // service_id is missing
                service_name: aString(),
                service_description: aString(),
                street_address: aString(),
                city: aString(),
                postal_code: aString(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }])).toThrow();
        });

        it('throws on wrong field type in service data', () => {
            const invalidValue = aNumber();
            expect(() => toValidSearchResponse([{
                service_id: invalidValue,
                service_name: aString(),
                service_description: aString(),
                street_address: aString(),
                city: aString(),
                postal_code: aString(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }])).toThrow();
        });

        it('throws on missing field in organization data', () => {
            expect(() => toValidSearchResponse([{
                // organization_name is missing
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            }])).toThrow();
        });

        it('throws on wrong field type in organization data', () => {
            const invalidData = aNumber();
            expect(() => toValidSearchResponse([{
                organization_name: invalidData,
                organization_description: aString(),
                organization_website: aString(),
                organization_email: aString(),
            }])).toThrow();
        });
    });
});
