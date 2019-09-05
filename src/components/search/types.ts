// tslint:disable-next-line:no-any
export type UnvalidatedData = any;

export interface LatLong {
    readonly latitude: number;
    readonly longitude: number;
}

export interface ServiceSearchHit {
    readonly type: 'ServiceSearchItem';
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
    readonly street_address: string;
    readonly city: string;
    readonly postal_code: string;
    readonly latitude: number;
    readonly longitude: number;
}

export interface OrganizationSearchHit {
    // TODO add organization id to the index
    readonly type: 'OrganizationSearchItem';
    readonly organization_id: string;
    readonly organization_name: string;
    readonly organization_description: string;
    readonly organization_website: string;
    readonly organization_email: string;
}

export type SearchHit = ServiceSearchHit | OrganizationSearchHit;
