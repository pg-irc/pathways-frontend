// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

import * as R from 'ramda';

// tslint:disable-next-line:no-any
type UnvalidatedData = any;

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

export type SearchItemList = ReadonlyArray<ServiceSearchItem> | ReadonlyArray<OrganizationSearchItem>;

export const validateSearchResponses = (data: UnvalidatedData): SearchItemList => {
    if (isServiceData(data)) {
        return toServiceData(data);
    }
    if (isOrganizationData(data)) {
        return toOrganizationData(data);
    }
    throw invalidSearchResultException(data);
};

const isServiceData = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(serviceSearchItemArray, data) as boolean;
};

const toServiceData = (data: UnvalidatedData): ReadonlyArray<ServiceSearchItem> => {
    const buildServiceData = (item: UnvalidatedData): ServiceSearchItem => ({
        service_id: item.service_id,
        service_name: item.service_name,
        service_description: item.service_description,
        street_address: item.street_address,
        city: item.city,
        postal_code: item.postal_code,
        _geoloc: {
            lat: item._geoloc.lat,
            lng: item._geoloc.lng,
        },
    });
    return R.map(buildServiceData, data);
};

const isOrganizationData = (data: UnvalidatedData): boolean => {
    const ajv = new Ajv();
    return ajv.validate(organizationSearchItemArray, data) as boolean;
};

const toOrganizationData = (data: UnvalidatedData): ReadonlyArray<OrganizationSearchItem> => {
    const buildServiceData = (item: UnvalidatedData): OrganizationSearchItem => ({
        organization_id: 'TODO',
        organization_name: item.organization_name,
        organization_description: item.organization_description,
        organization_website: item.organization_website,
        organization_email: item.organization_email,
    });
    return R.map(buildServiceData, data);
};

const invalidSearchResultException = (_: UnvalidatedData): Error => (
    new Error('')
);

const geoLocation = {
    'type': 'object',
    'properties': {
        'lng': { 'type': 'number' },
        'lat': { 'type': 'number' },
    },
    'required': ['service_name', 'service_description'],
};

const serviceSearchItem = {
    'type': 'object',
    'properties': {
        'service_name': { 'type': 'string' },
        'service_description': { 'type': 'string' },
        'service_id': { 'type': 'string' },
        'street_address': { 'type': 'string' },
        'city': { 'type': 'string' },
        'postal_code': { 'type': 'string' },
        '_geoloc': geoLocation,
    },
    'required': ['service_name',
        'service_description',
        'service_id',
        'street_address',
        'city',
        'postal_code',
        '_geoloc',
    ],
};

const serviceSearchItemArray = {
    'type': 'array',
    'items': serviceSearchItem,
};

const organizationSearchItem = {
    'type': 'object',
    'properties': {
        'organization_name': { 'type': 'string' },
        'organization_description': { 'type': 'string' },
        'organization_website': { 'type': 'string' },
        'organization_email': { 'type': 'string' },
    },
    'required': ['organization_name',
        'organization_description',
        'organization_website',
        'organization_email',
    ],
};

const organizationSearchItemArray = {
    'type': 'array',
    'items': organizationSearchItem,
};
