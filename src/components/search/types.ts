export interface ServiceHit {
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
    readonly street_address: string;
    readonly city: string;
    readonly postal_code: string;
}

export interface ServiceSearchItem {
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
    readonly street_address: string;
    readonly city: string;
    readonly postal_code: string;
    readonly _geoloc: GeoLocation;
}

export interface GeoLocation {
    readonly lng: number;
    readonly lat: number;
}

export interface OrganizationSearchItem {
    // TODO add organization id to the index
    readonly organization_id: string;
    readonly organization_name: string;
    readonly organization_description: string;
    readonly organization_website: string;
    readonly organization_email: string;
}

