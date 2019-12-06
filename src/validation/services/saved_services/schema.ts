// tslint:disable:quotemark trailing-comma
import { phoneNumberArray, addressWithTypeArray } from "../schema";

const latLong = {
    "type": "object",
    "properties": {
        "lat": {
            "type": "number"
        },
        "lng": {
            "type": "number"
        }
    },
    "required": ["lat", "long"]
};

const service = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "latlong": latLong,
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "phoneNumbers": phoneNumberArray,
        "addresses": addressWithTypeArray,
        "website": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "organization_name": {
            "type": "string"
        },
        "bookmarked": {
            "type": "boolean"
        }
    },
    "required": ["id", "latlong", "name", "description", "phoneNumbers", "addresses", "website", "email", "organization_name", "bookmarked"]
};

export const serviceMap = {
    "type": "object",
    "items": service
};
