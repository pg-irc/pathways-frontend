// tslint:disable:no-expression-statement no-any no-null-keyword
import { aString, aNumber } from '../../../application/helpers/random_test_values';
import * as helpers from './helpers/services_schema_helpers';
import { validateServicesAtLocationArray } from '..';

describe('schema for services_at_location endpoint', () => {

    describe('validating valid data', () => {

        test('validation passes on array of ServiceAtLocationJSON items', () => {
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().build(),
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('validation passes on array of ServiceAtLocationJSON items with an additional property', () => {
            const validator = validateServicesAtLocationArray([
                { ...new helpers.ServiceAtLocationJSONBuilder().build(), anotherProp: aString() },
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('validation passes on empty array', () => {
            const validator = validateServicesAtLocationArray([]);
            expect(validator.isValid).toBe(true);
        });
    });

    describe('validate service at location id', () => {
        test('service at location is of type number', () => {
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withId(null).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/id must be number');
        });
    });

    describe('validating service properties', () => {

        test('service is required', () => {
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().buildWithoutService(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0 must have required property \'service\'');
        });

        test('service is of type object', () => {
            const service: any = null;
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service must be object');
        });

        test('service.id is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutId();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service must have required property \'id\'');
        });

        test('service.id is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withId(null).build();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service/id must be string');
        });

        test('service.name is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutName();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service must have required property \'name\'');
        });

        test('service.name is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withName(null).build();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service/name must be string');
        });

        test('service.description is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutDescription();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service must have required property \'description\'');
        });

        test('service.description is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withDescription(null).build();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service/description must be string');
        });

        test('service.website is optional', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutWebsite();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('service.email is optional', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutEmail();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('service.website, if provided, is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withWebsite(null).build();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service/website must be string');
        });
        test('service.email, if provided, is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withEmail(null).build();
            const validator = validateServicesAtLocationArray([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data/0/service/email must be string');
        });

    });

    describe('validating location properties', () => {

        describe('location', () => {

            test('location is required', () => {
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().buildWithoutLocation(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0 must have required property \'location\'');
            });

            test('location is of type object', () => {
                const location: any = null;
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location must be object');
            });
        });

        describe('latitude', () => {

            test('location.latitude is optional', () => {
                const location = new helpers.LocationJSONBuilder().buildWithoutLatitude();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(true);
            });

            test('location.latitude, if provided, is of type number', () => {
                const location = new helpers.LocationJSONBuilder().withLatitude(null).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/latitude must be number');
            });

        });

        describe('longitude', () => {

            test('location.longitude is optional', () => {
                const location = new helpers.LocationJSONBuilder().buildWithoutLongitude();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(true);
            });

            test('location.longitude, if provided, is of type number', () => {
                const location = new helpers.LocationJSONBuilder().withLongitude(null).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/longitude must be number');
            });

        });

        describe('addresses', () => {

            test('location.addresses is required', () => {
                const location = new helpers.LocationJSONBuilder().buildWithoutAddresses();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location must have required property \'addresses\'');
            });

            test('location.addresses is of type array', () => {
                const location = new helpers.LocationJSONBuilder().withAddressesWithType(null).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses must be array');
            });

            test('location.addresses can be empty array', () => {
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(true);
            });

            test('location.addresses item is of type object', () => {
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([null]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0 must be object');
            });

            test('location.addresses item.address_type is required ', () => {
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().buildWithoutAddressType();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0 must have required property \'address_type\'');
            });

            test('location.addresses item.address_type is of type string', () => {
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddressType(null).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address_type must be string');
            });

            test('location.addresses item.address is required ', () => {
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().buildWithoutAddress();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0 must have required property \'address\'');
            });

            test('location.addresses item.address.id is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutId();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'id\'');
            });

            test('location.addresses item.address.id is of type string', () => {
                const address = new helpers.AddressJSONBuilder().withId(null).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/id must be string');
            });

            test('location.addresses item.address.address is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutAddress();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'address\'');
            })

            test('location.addresses item.address.address is of type string or null', () => {
                const address = new helpers.AddressJSONBuilder().withAddress(aNumber()).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/address must be string,null');
            });

            test('location.addresses item.address.city is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutCity();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'city\'');
            });

            test('location.addresses item.address.city is of type string or null', () => {
                const address = new helpers.AddressJSONBuilder().withCity(aNumber()).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/city must be string,null');
            });

            test('location.addresses item.address.state_province is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutStateProvince();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'state_province\'');
            });

            test('location.addresses item.address.state_province is of type string or null', () => {
                const address = new helpers.AddressJSONBuilder().withStateProvince(aNumber()).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/state_province must be string,null');
            });

            test('location.addresses item.address.postal_code is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutPostalCode();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'postal_code\'');
            });

            test('location.addresses item.address.postal_code is of type string or null', () => {
                const address = new helpers.AddressJSONBuilder().withPostalCode(aNumber()).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/postal_code must be string,null');
            });

            test('location.addresses item.address.country is required', () => {
                const address = new helpers.AddressJSONBuilder().buildWithoutCountry();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address must have required property \'country\'');
            });

            test('location.addresses item.address.country is of type string', () => {
                const address = new helpers.AddressJSONBuilder().withCountry(null).build();
                const addressWithType = new helpers.AddressWithTypeJSONBuilder().withAddress(address).build();
                const location = new helpers.LocationJSONBuilder().withAddressesWithType([addressWithType]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/addresses/0/address/country must be string');
            });
        });

        describe('phone_numbers', () => {

            test('location.phone_numbers is required', () => {
                const location = new helpers.LocationJSONBuilder().buildWithoutPhoneNumbers();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location must have required property \'phone_numbers\'');
            });

            test('location.phone_numbers is of type array', () => {
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers(null).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers must be array');
            });

            test('location.phone_numbers can be empty array', () => {
                const location = new helpers.LocationJSONBuilder()
                    .withPhoneNumbers([])
                    .withAddressesWithType([])
                    .build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(true);
            });

            test('location.phone_numbers item is of type object', () => {
                const phoneNumber: any = null;
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers/0 must be object');
            });

            test('location.phone_numbers item.phone_number_type is required ', () => {
                const phoneNumber = new helpers.PhoneNumberJSONBuilder().buildWithoutPhoneNumberType();
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers/0 must have required property \'phone_number_type\'');
            });

            test('location.phone_numbers item.phone_number_type is of type string', () => {
                const phoneNumber = new helpers.PhoneNumberJSONBuilder().withPhoneNumberType(null).build();
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers/0/phone_number_type must be string');
            });

            test('location.phone_numbers item.phone_number is required ', () => {
                const phoneNumber = new helpers.PhoneNumberJSONBuilder().buildWithoutPhoneNumber();
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers/0 must have required property \'phone_number\'');
            });

            test('location.phone_numbers item.phone_number is of type string', () => {
                const phoneNumber = new helpers.PhoneNumberJSONBuilder().withPhoneNumber(null).build();
                const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
                const validator = validateServicesAtLocationArray([
                    new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
                ]);
                expect(validator.isValid).toBe(false);
                expect(validator.errors).toBe('data/0/location/phone_numbers/0/phone_number must be string');
            });
        });
    });
});
