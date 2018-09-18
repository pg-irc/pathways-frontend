// tslint:disable:no-expression-statement
// tslint:disable:no-let
// tslint:disable:no-any
import * as Ajv from 'ajv';
import { servicesAtLocationSchema, JSONSchemaPhoneNumber } from '../services_at_location';
import { anInteger, aString } from '../../application/__tests__/helpers/random_test_values';
import { buildJSONSchemaService, buildJSONSchemaServiceAtLocation } from './helpers/services_at_location_helpers';

describe('services at location schema', () => {
    // By default validation fails on first error
    // so we can test our servicesAtLocationSchemas from the top down.
    const ajv = new Ajv();

    describe('validates services_at_location object', () => {

        test('validation passes on valid object', () => {
            const data = buildJSONSchemaServiceAtLocation();
            const valid = ajv.validate(servicesAtLocationSchema, data);
            expect(valid).toBe(true);
        });

        test('validation passes on valid object with additional properties', () => {
            const data = {...buildJSONSchemaServiceAtLocation(), anotherProp: aString() };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            expect(valid).toBe(true);
        });
    });

    describe('validates service properties', () => {

        test('service is required', () => {
            const data = {};
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data should have required property \'service\'');
        });

        test('service is of type object', () => {
            const data = { service: aString() };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service should be object');
        });

        test('service.id is required', () => {
            const data = { service: {} };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service should have required property \'id\'');
        });

        test('service.id is of type string', () => {
            const data = { service: { id: anInteger() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service.id should be string');
        });

        test('service.name is required', () => {
            const data = { service: { id: aString() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service should have required property \'name\'');
        });

        test('service.name is of type string', () => {
            const data = { service: { id: aString(), name: anInteger() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service.name should be string');
        });

        test('service.description is required', () => {
            const data = { service: { id: aString(), name: aString() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service should have required property \'description\'');
        });

        test('service.description is of type string', () => {
            const data = { service: { id: aString(), name: aString(), description: anInteger() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.service.description should be string');
        });
    });

    describe('validates location properties', () => {

        test('location is required', () => {
            const data = { service: buildJSONSchemaService() };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data should have required property \'location\'');
        });

        test('location is of type object', () => {
            const data = { service: buildJSONSchemaService(), location: aString() };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location should be object');
        });

        test('location.phone_numbers is required', () => {
            const data = { service: buildJSONSchemaService(), location: {} };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location should have required property \'phone_numbers\'');
        });

        test('location.phone_numbers is of type array', () => {
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: aString() } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers should be array');
        });

        test('location.phone_numbers can be empty array', () => {
            const phoneNumbers: ReadonlyArray<JSONSchemaPhoneNumber> = [];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            expect(valid).toBe(true);
        });

        test('location.phone_numbers item is of type object', () => {
            const phoneNumbers: ReadonlyArray<string> = [ aString() ];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers[0] should be object');
        });

        test('location.phone_numbers item.phone_number_type is required ', () => {
            const phoneNumbers: ReadonlyArray<object> = [ {} ];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers[0] should have required property \'phone_number_type\'');
        });

        test('location.phone_numbers item.phone_number_type is of type string', () => {
            const phoneNumbers: ReadonlyArray<object> = [ { phone_number_type: anInteger() } ];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers[0].phone_number_type should be string');
        });

        test('location.phone_numbers item.phone_number is required ', () => {
            const phoneNumbers: ReadonlyArray<object> = [ { phone_number_type: aString() } ];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers[0] should have required property \'phone_number\'');
        });

        test('location.phone_numbers item.phone_number is of type string', () => {
            const phoneNumbers: ReadonlyArray<object> = [ { phone_number_type: aString(), phone_number: anInteger() } ];
            const data = { service: buildJSONSchemaService(), location: { phone_numbers: phoneNumbers } };
            const valid = ajv.validate(servicesAtLocationSchema, data);
            const errorsText = ajv.errorsText(ajv.errors);
            expect(valid).toBe(false);
            expect(errorsText).toBe('data.location.phone_numbers[0].phone_number should be string');
        });
    });
});
