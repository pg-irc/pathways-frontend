// tslint:disable:no-expression-statement
import { serviceFromValidatedJSON } from '../index';
import { aNumber, aString } from '../../../helpers/random_test_values';

describe('Adapting server service object to client service object', () => {

    it('it builds expected object', () => {
        const serverServiceObject = {
            id: aNumber(),
            service: {
                id: aString(),
                name: aString(),
                description: aString(),
                organization_url: aString(),
                organization_email: aString(),
                organization_name: aString(),
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
        const clientServiceObject = serviceFromValidatedJSON(serverServiceObject);
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
        };

        expect(clientServiceObject).toEqual(expectedClientServiceObject);
    });
});