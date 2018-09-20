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

const location = {
    "type": "object",
    "properties": {
        "phone_numbers": phoneNumberArray
    },
    "required": ["phone_numbers"]
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
