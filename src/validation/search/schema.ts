export const organizationUnderService = {
    'type': 'object',
    'properties': {
        'id': { 'type': 'string' },
        'name': { 'type': 'string' },
        'website': { 'type': 'string' },
        'email': { 'type': 'string' },
        'service_count': { 'type': 'number' },
    },
    'required': ['id', 'name', 'website', 'email', 'service_count'],
};

export const address = {
    'type': 'object',
    'properties': {
        'address': { 'type': 'string' },
        'city': { 'type': 'string' },
        'state_province': { 'type': 'string' },
        'postal_code': { 'type': 'string' },
        'country': { 'type': 'string' },
    },
    'required': ['address', 'city', 'state_province', 'postal_code', 'country'],
};

export const geoLocation = {
    'type': 'object',
    'properties': {
        'lng': { 'type': ['number', 'string'] },
        'lat': { 'type': ['number', 'string'] },
    },
    'required': ['lng', 'lat'],
};

export const serviceSearchItem = {
    'type': 'object',
    'properties': {
        'service_name': { 'type': 'string' },
        'service_description': { 'type': 'string' },
        'service_id': { 'type': 'string' },
        'organization': organizationUnderService,
        'address': address,
        '_geoloc': geoLocation,
    },
    'required': [
        'service_name',
        'service_description',
        'service_id',
        'organization',
        'address',
        '_geoloc',
    ],
};

export const serviceSearchItemArray = {
    'type': 'array',
    'items': serviceSearchItem,
};

export const organizationSearchItem = {
    'type': 'object',
    'properties': {
        'organization_id': { 'type': 'string' },
        'organization_name': { 'type': 'string' },
        'organization_description': { 'type': 'string' },
        'organization_website': { 'type': 'string' },
        'organization_email': { 'type': 'string' },
    },
    'required': ['organization_id',
        'organization_name',
        'organization_description',
        'organization_website',
        'organization_email',
    ],
};

export const organizationSearchItemArray = {
    'type': 'array',
    'items': organizationSearchItem,
};
