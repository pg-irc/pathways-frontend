// tslint:disable:no-any no-expression-statement
import { validateServiceSearchHits } from '..';
import { aString, aNumber } from '../../../application/helpers/random_test_values';
import { anAddress, anOrganization, aGeoLocation } from './helpers/search_schema';


describe('Search response validation', () => {
    describe('with valid data', () => {

        it('accepts data without phone number', () => {
            const serviceId = aString();
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
            }];
            const result = validateServiceSearchHits(serviceData);
            expect(result.validData).toEqual(serviceData);
        });

        it('accepts data with phone number', () => {
            const firstPhoneNumberType = aString();
            const secondPhoneNumber = aString();
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: aString(),
                service_description: aString(),
                address: anAddress(),
                phone_numbers: [{
                    phone_number: aString(),
                    type: firstPhoneNumberType,
                }, {
                    phone_number: secondPhoneNumber,
                    type: aString(),
                }],
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
            }];
            const result = validateServiceSearchHits(serviceData);
            expect(result.validData[0].phone_numbers[0].type).toEqual(firstPhoneNumberType);
            expect(result.validData[0].phone_numbers[1].phone_number).toEqual(secondPhoneNumber);
        });
    });

    describe('with invalid data', () => {

        it('returns invalid on missing field in service data', () => {
            const validationResult = validateServiceSearchHits([{
                service_name: aString(),
                // service_id: serviceId,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });

        it('returns invalid on wrong field type in service data', () => {
            const invalidValue = aNumber();
            const validationResult = validateServiceSearchHits([{
                service_name: aString(),
                service_id: invalidValue,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
            }]);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain('service_id');
        });
    });
    describe('with valid data', () => {

        it('accepts data without email', () => {
            const serviceId = aString();
            const serviceData: ReadonlyArray<any> = [{
                service_name: aString(),
                service_id: serviceId,
                service_description: aString(),
                address: anAddress(),
                organization: anOrganization(),
                _geoloc: aGeoLocation(),
            }];
            const result = validateServiceSearchHits(serviceData);
            expect(result.validData).toEqual(serviceData);
        });
    });

    it('accepts data with email', () => {
        const serviceData: ReadonlyArray<any> = [{
            service_name: aString(),
            service_id: aString(),
            service_description: aString(),
            address: anAddress(),
            organization: anOrganization(),
            _geoloc: aGeoLocation(),
            email: aString()
        }];
        const result = validateServiceSearchHits(serviceData);
        expect(result.validData).toEqual(serviceData);
    });
});
