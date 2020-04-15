// tslint:disable:no-expression-statement
import { toServicesFromValidatedData } from '../index';
import { aDate, aNumber, aString } from '../../../application/helpers/random_test_values';

describe('Adapting server service object to client service object', () => {
    const serverServiceObject = {
        id: aNumber(),
        service: {
            id: aString(),
            name: aString(),
            description: aString(),
            organization_url: aString(),
            organization_email: aString(),
            organization_name: aString(),
            last_verified_date: aDate(),
        },
        location: {
            latitude: aNumber(),
            longitude: aNumber(),
            phone_numbers: [{ phone_number_type: aString(), phone_number: aString() }],
            addresses: [{
                address_type: aString(),
                address: {
                    id: aNumber(),
                    address: aString(),
                    city: aString(),
                    state_province: aString(),
                    postal_code: aString(),
                    country: aString(),
                },
            }],
        },
    };

    it('builds expected structure', () => {
        const clientServiceObject = toServicesFromValidatedData([], [serverServiceObject])[0];
        const expectedClientServiceObject = {
            id: serverServiceObject.service.id,
            services_at_location_id: serverServiceObject.id,
            latlong: {
                lat: serverServiceObject.location.latitude,
                lng: serverServiceObject.location.longitude,
            },
            name: serverServiceObject.service.name,
            description: serverServiceObject.service.description,
            phoneNumbers: [{
                type: serverServiceObject.location.phone_numbers[0].phone_number_type,
                phone_number: serverServiceObject.location.phone_numbers[0].phone_number,
            }],
            addresses: [{
                id: serverServiceObject.location.addresses[0].address.id,
                type: serverServiceObject.location.addresses[0].address_type,
                address: serverServiceObject.location.addresses[0].address.address,
                city: serverServiceObject.location.addresses[0].address.city,
                stateProvince: serverServiceObject.location.addresses[0].address.state_province,
                postalCode: serverServiceObject.location.addresses[0].address.postal_code,
                country: serverServiceObject.location.addresses[0].address.country,
            }],
            website: serverServiceObject.service.organization_url,
            email: serverServiceObject.service.organization_email,
            organizationName: serverServiceObject.service.organization_name,
            bookmarked: false,
            lastVerifiedDate: serverServiceObject.service.last_verified_date,
        };

        expect(clientServiceObject).toEqual(expectedClientServiceObject);
    });

    it('sets "bookmarked" set to false when no bookmark exists for the service', () => {
        const clientServiceObject = toServicesFromValidatedData([], [serverServiceObject])[0];
        expect(clientServiceObject.bookmarked).toBe(false);
    });

    it('sets "bookmarked" set to true when a bookmark exists for the service', () => {
        const clientServiceObject = toServicesFromValidatedData([serverServiceObject.service.id], [serverServiceObject])[0];
        expect(clientServiceObject.bookmarked).toBe(true);
    });
});
