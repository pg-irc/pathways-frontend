import { SearchServiceData } from './types';
import { HumanServiceData } from '../services/types';

export const toHumanServiceData = (data: SearchServiceData): HumanServiceData => ({
    id: data.service_id,
    latitude: validateLatLong(data._geoloc.lat),
    longitude: validateLatLong(data._geoloc.lng),
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

const validateLatLong = (LatOrLong: string | number): number => {
    const defaultLatOrLong = 0;
    if (LatOrLong === '') {
        return defaultLatOrLong;
    }
    if ((typeof LatOrLong === 'number')) {
        return LatOrLong;
    }
    throw new Error('Non empty strings are invalid lat/long');
};