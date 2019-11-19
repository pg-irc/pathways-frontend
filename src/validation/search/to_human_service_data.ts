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

const validateLatLong = (latitude: number, longitude: number): LatLong => {
    return { lat: latitude, lng: longitude };
};