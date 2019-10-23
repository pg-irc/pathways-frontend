// tslint:disable-next-line:no-any
export type UnvalidatedData = any;

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

export interface LatLong {
    readonly latitude: number;
    readonly longitude: number;
}

export interface SearchServiceData {
    readonly type: 'SearchServiceData';
    readonly service_name: string;
    readonly service_description: string;
    readonly service_id: string;
    readonly organization: OrganizationUnderService;
    readonly address: Address;
    readonly _geoloc: LatLong;
}
