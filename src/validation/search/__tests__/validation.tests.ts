// tslint:disable:no-any no-expression-statement
import { validateServiceSearchResponse } from '..';
import { aString, aNumber } from '../../../helpers/random_test_values';

describe('Search response validation', () => {

    const anAddress = (): any => ({
        address: aString(),
        city: aString(),
        state_province: aString(),
        postal_code: aString(),
        country: aString(),
    });

    const anOrganization = (): any => ({
        id: aString(),
        name: aString(),
        website: aString(),
        email: aString(),
        service_count: aNumber(),
    });

    describe('with valid data', () => {

        it('accepts data without phone number', () => {
            const serviceId = aString();
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }];
            const result = validateServiceSearchResponse(serviceData);
            expect(result.validData).toEqual(serviceData);
        });

        it('accepts data with phone number', () => {
            const firstType = aString();
            const secondNumber = aString();
            // tslint:disable-next-line:no-any
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                address: anAddress(),
                phone_numbers: [{
                    phone_number: aString(),
                    type: firstType,
                }, {
                    phone_number: secondNumber,
                    type: aString(),
                }],
                organization: anOrganization(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }];
            const result = validateServiceSearchResponse(serviceData);
            expect(result.validData[0].phone_numbers[0].type).toEqual(firstType);
            expect(result.validData[0].phone_numbers[1].phone_number).toEqual(secondNumber);
        });
    });
    describe('with invalid data', () => {
        it('returns invalid on missing field in service data', () => {
            const validationResult = validateServiceSearchResponse([{
                service_name: aString(),
                // service_id: serviceId,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: {
                    lat: aNumber(),
                    lng: aNumber(),
                },
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });

        it('returns invalid on wrong field type in service data', () => {
            const invalidValue = aNumber();
            const validationResult = validateServiceSearchResponse([{
                service_name: aString(),
                service_id: invalidValue,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
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
