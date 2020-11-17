import { aString, aNumber } from '../../../../application/helpers/random_test_values';

export const anAddress = (): any => ({
    address: aString(),
    city: aString(),
    state_province: aString(),
    postal_code: aString(),
    country: aString(),
});

export const anOrganization = (): any => ({
    id: aString(),
    name: aString(),
    website: aString(),
    email: aString(),
    service_count: aNumber(),
});

export const aGeoLocation = (): any => ({
    lat: aNumber(),
    lng: aNumber(),
});

export const anSearchService = (): any => ({
    type: 'SearchServiceData',
    service_name: aString(),
    service_id: aString(),
    service_description: aString(),
    address: anAddress(),
    organization: anOrganization(),
    _geoloc: aGeoLocation(),
    email: aString(),
});
