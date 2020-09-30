// tslint:disable:quotemark trailing-comma

const organization = {
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
    },
    "required": ["id", "name", "description"]
};

export const organizationArray = {
    'type': 'array',
    'items': organization,
};