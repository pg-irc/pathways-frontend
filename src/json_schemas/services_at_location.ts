// tslint:disable:quotemark
// tslint:disable:trailing-comma

export const servicesAtLocationSchema = {
    "type": "object",
    "properties": {
        "service": {
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
            "required": [ "id", "name", "description" ]
        },
        "location": {
            "type": "object",
            "properties": {
                "phone_numbers": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "phone_number_type": {
                                "type": "string"
                            },
                            "phone_number": {
                                "type": "string"
                            }
                        },
                        "required": [ "phone_number_type", "phone_number" ]
                    }
                },
            },
            "required": [ "phone_numbers" ]
        }
    },
    "required": [ "service", "location" ]
};