import { SearchServiceData } from './types';
import { HumanServiceData, Id } from '../services/types';
import { LatLong } from '../latlong/types';
import * as R from 'ramda';

export const toHumanServiceData = (
    data: SearchServiceData, bookmarkedServicesIds: ReadonlyArray<Id>, reviewedServiceIds: ReadonlyArray<Id>,
    ): HumanServiceData => ({
    id: data.service_id,
    latlong: validateLatLong(data._geoloc.lat, data._geoloc.lng),
    name: data.service_name,
    alternateName: data.alternate_name,
    description: data.service_description,
    phoneNumbers: data.phone_numbers || [],
    addresses: [{
        id: '1',
        type: 'physical_address',
        address: data.address.address,
        city: data.address.city,
        stateProvince: data.address.state_province,
        postalCode: data.address.postal_code,
        country: data.address.country,
    }],
    website: data.organization.website,
    email: data.organization.email,
    organizationId: data.organization.id,
    organizationName: data.organization.name,
    bookmarked: R.includes(data.service_id, bookmarkedServicesIds),
    reviewed: R.includes(data.service_id, reviewedServiceIds),
    lastVerifiedDate: data.last_verified_date,
});

const validateLatLong = (latitude: number | string, longitude: number | string): LatLong | undefined => {
    if (typeof latitude === 'number' && typeof longitude === 'number') {
        return { lat: latitude, lng: longitude };
    }
    if (latitude === '' && longitude === '') {
        return undefined;
    }
    throw new Error('Invalid types for lat/long in search result');
};