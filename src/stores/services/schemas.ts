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
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "state_province": {
            "type": "string"
        },
        "postal_code": {
            "type": "string"
        },
        "country": {
            "type": "string"
        }
    },
    "required": ["id", "address", "city", "state_province", "postal_code", "country"]
};
const fullAddress = {
    "type": "object",
    "properties": {
        "address_type": {
            "type": "string"
        },
        "address": address
    },
    "required": ["address_type", "address"]
};
const addressArray = {
    "type": "array",
    "items": fullAddress
};
const location = {
    "type": "object",
    "properties": {
        "phone_numbers": phoneNumberArray,
        "addresses": addressArray
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
//# sourceMappingURL=schemas.js.map