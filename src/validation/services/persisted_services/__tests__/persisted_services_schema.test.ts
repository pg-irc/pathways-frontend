// tslint:disable:no-expression-statement no-any no-null-keyword
import { validateServiceMap } from '..';
import { ServiceBuilder } from '../../../../stores/__tests__/helpers/services_helpers';
import { aString, aNumber, aBoolean } from '../../../../helpers/random_test_values';

describe('schema for saved service map', () => {

    describe('validating valid data', () => {

        test('validation passes on valid service map', () => {
            const validService = new ServiceBuilder().withBookmarked(true).build();
            const validator = validateServiceMap({validService});
            expect(validator.isValid).toBe(true);
        });

        test('validation passes on empty object', () => {
            const validator = validateServiceMap({});
            expect(validator.isValid).toBe(true);
        });
        test('validation fails if service map is not of type object', () => {
            const invalidData: any = [];
            const validator = validateServiceMap(invalidData);
            expect(validator.isValid).toBe(false);
        });
    });

    describe('ensure schema of persisted service map remains consistent over time', () => {
        const anId = aString();
        const aLatitude = aNumber();
        const aLongitude = aNumber();
        const aLatLong = {
            lat: aLatitude,
            lng: aLongitude,
        };
        const aName = aString();
        const aDescription = aString();
        const aPhoneNumber = {
            type: aString(),
            phone_number: aString(),
        };
        const anAddress = {
            type: aString(),
            id: aNumber(),
            address: aString(),
            city: aString(),
            stateProvince: aString(),
            postalCode: aString(),
            country: aString(),
        };
        const aWebsite = aString();
        const anEmail = aString();
        const anOrganizationName = aString();
        const aBookmarked = aBoolean();

        // This reflects the current persisted service schema used in the app. Any changes to the schema should cause a failure in this test
        const validPersistedService = {
            id: anId,
            latlong: aLatLong,
            name: aName,
            description: aDescription,
            phoneNumbers: [aPhoneNumber],
            addresses: [anAddress],
            website: aWebsite,
            email: anEmail,
            organizationName: anOrganizationName,
            bookmarked: aBookmarked,
       };
       test('the created service is consistent with the validPersistedService', () => {
            const serviceCreatedByServiceBuilder = new ServiceBuilder()
            .withId(anId)
            .withLatitude(aLatitude)
            .withLongitude(aLongitude)
            .withName(aName)
            .withDescription(aDescription)
            .withPhoneNumbers([aPhoneNumber])
            .withAddresses([anAddress])
            .withWebsite(aWebsite)
            .withEmail(anEmail)
            .withOrganizationName(anOrganizationName)
            .withBookmarked(aBookmarked)
            .build();

            expect(serviceCreatedByServiceBuilder).toEqual(validPersistedService);
       });
    });
});