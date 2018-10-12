// tslint:disable:no-expression-statement no-any no-null-keyword
import { aString } from '../../application/__tests__/helpers/random_test_values';
import * as helpers from '../__tests__/helpers/services_schema_helpers';
import { servicesAtLocationValidator } from '../../json_schemas/validators';

describe('schema for services_at_location endpoint', () => {

    describe('validating valid data', () => {

        test('validation passes on array of ServiceAtLocationJSON items', () => {
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().build(),
            ]);
            expect(validator.isValid).toBe(false);
        });

        test('validation passes on array of ServiceAtLocationJSON items with an additional property', () => {
            const validator = servicesAtLocationValidator([
                { ...new helpers.ServiceAtLocationJSONBuilder().build(), anotherProp: aString() },
            ]);
            expect(validator.isValid).toBe(false);
        });

        test('validation passes on empty array', () => {
            const validator = servicesAtLocationValidator([]);
            expect(validator.isValid).toBe(true);
        });
    });

    describe('validating service properties', () => {

        test('service is required', () => {
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().buildWithoutService(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0] should have required property \'service\'');
        });

        test('service is of type object', () => {
            const service: any = null;
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service should be object');
        });

        test('service.id is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutId();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service should have required property \'id\'');
        });

        test('service.id is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withId(null).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service.id should be string');
        });

        test('service.name is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutName();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service should have required property \'name\'');
        });

        test('service.name is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withName(null).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service.name should be string');
        });

        test('service.description is required', () => {
            const service = new helpers.ServiceJSONBuilder().buildWithoutDescription();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service should have required property \'description\'');
        });

        test('service.description is of type string', () => {
            const service = new helpers.ServiceJSONBuilder().withDescription(null).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withService(service).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].service.description should be string');
        });
    });

    describe('validating location properties', () => {

        test('location is required', () => {
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().buildWithoutLocation(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0] should have required property \'location\'');
        });

        test('location is of type object', () => {
            const location: any = null;
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location should be object');
        });

        test('location.phone_numbers is required', () => {
            const location = new helpers.LocationJSONBuilder().buildWithoutPhoneNumbers();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location should have required property \'phone_numbers\'');
        });

        test('location.addresses is required', () => {
            const location = new helpers.LocationJSONBuilder().buildWithoutAddresses();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location should have required property \'addresses\'');
        });

        test('location.phone_numbers is of type array', () => {
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers(null).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers should be array');
        });

        test('location.addresses is of type array', () => {
            const location = new helpers.LocationJSONBuilder().addressWithType(null).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses should be array');
        });

        test('location.phone_numbers can be empty array', () => {
            const location = new helpers.LocationJSONBuilder()
                .withPhoneNumbers([])
                .addressWithType([])
                .build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('location.addresses can be empty array', () => {
            const location = new helpers.LocationJSONBuilder().addressWithType([]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(true);
        });

        test('location.phone_numbers item is of type object', () => {
            const phoneNumber: any = null;
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers[0] should be object');
        });

        test('location.addresses item is of type object', () => {
            const address: any = null;
            const location = new helpers.LocationJSONBuilder().addressWithType([address]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses[0] should be object');
        });

        test('location.phone_numbers item.phone_number_type is required ', () => {
            const phoneNumber = new helpers.PhoneNumberJSONBuilder().buildWithoutPhoneNumberType();
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers[0] should have required property \'phone_number_type\'');
        });

        test('location.addresses item.address_type is required ', () => {
            const address = new helpers.AddressWithTypeJSONBuilder().buildWithoutAddressType();
            const location = new helpers.LocationJSONBuilder().addressWithType([address]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses[0] should have required property \'address_type\'');
        });

        test('location.phone_numbers item.phone_number_type is of type string', () => {
            const phoneNumber = new helpers.PhoneNumberJSONBuilder().withPhoneNumberType(null).build();
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers[0].phone_number_type should be string');
        });

        test('location.addresses item.address_type is of type string', () => {
            const address = new helpers.AddressWithTypeJSONBuilder().withAddressType(null).build();
            const location = new helpers.LocationJSONBuilder().addressWithType([address]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses[0].address_type should be string');
        });

        test('location.phone_numbers item.phone_number is required ', () => {
            const phoneNumber = new helpers.PhoneNumberJSONBuilder().buildWithoutPhoneNumber();
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers[0] should have required property \'phone_number\'');
        });

        test('location.addresses item.address is required ', () => {
            const address = new helpers.AddressWithTypeJSONBuilder().buildWithoutAddress();
            const location = new helpers.LocationJSONBuilder().addressWithType([address]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses[0] should have required property \'address\'');
        });

        test('location.phone_numbers item.phone_number is of type string', () => {
            const phoneNumber = new helpers.PhoneNumberJSONBuilder().withPhoneNumber(null).build();
            const location = new helpers.LocationJSONBuilder().withPhoneNumbers([phoneNumber]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.phone_numbers[0].phone_number should be string');
        });

        test('location.addresses item.address is of type object', () => {
            const address = new helpers.AddressWithTypeJSONBuilder().withAddress(null).build();
            const location = new helpers.LocationJSONBuilder().addressWithType([address]).build();
            const validator = servicesAtLocationValidator([
                new helpers.ServiceAtLocationJSONBuilder().withLocation(location).build(),
            ]);
            expect(validator.isValid).toBe(false);
            expect(validator.errors).toBe('data[0].location.addresses[0].address should be object');
        });
    });
});
