// tslint:disable-next-line:no-any
export type UnvalidatedData = any;

export interface LatLong {
    readonly latitude: number;
    readonly longitude: number;
}

export interface SearchServiceData {
    readonly type: 'ServiceSearchItem';
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
    readonly organization_name: string;
    readonly organization_website: string;
    readonly organization_email: string;
    readonly street_address: string;
    readonly city: string;
    readonly province: string;
    readonly postal_code: string;
    readonly country: string;
    readonly latitude: number;
    readonly longitude: number;
}
