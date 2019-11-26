import { PhoneNumber } from '../services/types';

interface OrganizationUnderService {
    readonly id: string;
    readonly name: string;
    readonly website: string;
    readonly email: string;
    readonly service_count: number;
}

interface Address {
    readonly address: string;
    readonly city: string;
    readonly state_province: string;
    readonly postal_code: string;
    readonly country: string;
}

export interface AlgoliaLatLong {
    readonly lat: number | string;
    readonly lng: number | string;
}

export interface SearchServiceData {
    readonly type: 'SearchServiceData';
    readonly service_name: string;
    readonly service_description: string;
    readonly service_id: string;
    readonly organization: OrganizationUnderService;
    readonly address: Address;
    readonly phone_numbers?: ReadonlyArray<PhoneNumber>;
    readonly _geoloc: AlgoliaLatLong;
}
