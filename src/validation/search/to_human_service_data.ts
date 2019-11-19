import { SearchServiceData } from './types';
import { HumanServiceData } from '../services/types';
import { LatLong } from '../latlong/types';

export const toHumanServiceData = (data: SearchServiceData): HumanServiceData => ({
    id: data.service_id,
    latlong: validateLatLong(data._geoloc.lat, data._geoloc.lng),
    name: data.service_name,
    description: data.service_description,
    phoneNumbers: [{
        type: 'temp',
        phoneNumber: '1-800-FOR-NOWW',
    }],
    addresses: [{
        id: 1,
        type: 'physical_address',
        address: data.address.address,
        city: data.address.city,
        stateProvince: data.address.state_province,
        postalCode: data.address.postal_code,
        country: data.address.country,
    }],
    website: data.organization.website,
    email: data.organization.email,
    organizationName: data.organization.name,
});

const validateLatLong = (latitude: number | string, longitude: number | string): LatLong => {
    if (typeof latitude !== typeof longitude) {
        throw new Error('Latitude and Longitude types do not match');
    }
    if (typeof latitude === 'number' && typeof longitude === 'number') {
        return { lat: latitude, lng: longitude };
    }
    if (latitude === '' && longitude === '') {
        return { lat: 0, lng: 0 };
    }
    throw new Error('Non empty strings do not make sense for Latitude and Longitude');
};