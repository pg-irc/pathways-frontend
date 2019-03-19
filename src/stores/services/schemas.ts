// tslint:disable:quotemark trailing-comma
const service = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "website": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "organization_name": {
            "type": "string"
        }
    },
    "required": ["id", "name", "description"]
};

const phoneNumber = {
    "type": "object",
    "properties": {
        "phone_number_type": {
            "type": "string"
        },
        "phone_number": {
            "type": "string"
        }
    },
    "required": ["phone_number_type", "phone_number"]
};

const phoneNumberArray = {
    "type": "array",
    "items": phoneNumber
};

const address = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "address": {
            "type": ["string", "null"]
        },
        "city": {
            "type": "string"
        },
        "state_province": {
            "type": ["string", "null"]
        },
        "postal_code": {
            "type": ["string", "null"]
        },
        "country": {
            "type": "string"
        }
    },
    "required": ["id", "address", "city", "state_province", "postal_code", "country"]
};

const addressWithType = {
    "type": "object",
    "properties": {
        "address_type": {
            "type": "string"
        },
        "address": address
    },
    "required": ["address_type", "address"]
};

const addressWithTypeArray = {
    "type": "array",
    "items": addressWithType
};

const location = {
    "type": "object",
    "properties": {
        "latitude": {
            "type": "number"
        },
        "longitude": {
            "type": "number"
        },
        "phone_numbers": phoneNumberArray,
        "addresses": addressWithTypeArray
    },
    "required": ["phone_numbers", "addresses"]
};

export const serviceAtLocation = {
    "type": "object",
    "properties": {
        "service": service,
        "location": location
    },
    "required": ["service", "location"]
};

export const serviceAtLocationArray = {
    "type": "array",
    "items": serviceAtLocation
};
