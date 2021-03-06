import { serviceSearchItemArray } from "../search/schema";

// tslint:disable:quotemark trailing-comma

const chosenAnswersArray = {
    "type": "array",
    "items": {
        "type": "string"
    }
};

const topicsIdsArray = {
    "type": "array",
    "items": {
        "type": "string"
    }
};

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
    "required": ["lat", "lng"]
};

const phoneNumber = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string"
        },
        "phone_number": {
            "type": "string"
        }
    },
    "required": ["type", "phone_number"]
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
        "type": {
            "type": "string"
        },
        "address": {
            address
        }
    },
    "required": ["type", "address"]
};

const addressWithTypeArray = {
    "type": "array",
    "items": addressWithType
};

const serviceIdRegularExpression = "^[A-Za-z0-9]+$";

const serviceMap = {
    "type": "object",
    "patternProperties": {
        [serviceIdRegularExpression]: {
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
                    "type": ["string", "null"]
                },
                "addresses": addressWithTypeArray,
                "phoneNumbers": phoneNumberArray,
                "website": {
                    "type": ["string", "null"]
                },
                "email": {
                    "type": ["string", "null"]
                },
                "organizationName": {
                    "type": ["string", "null"]
                },
                "bookmarked": {
                    "type": "boolean"
                },
                "reviewed": {
                    "type": "boolean"
                }
            },
            "required": ["id", "name", "description", "phoneNumbers", "addresses", "website", "email", "organizationName", "bookmarked", "reviewed"]
        }
    }
};

const reviewedServicesIdsArray = {
    "type": "array",
    "items": {
        "type": "string"
    }
};

export const userData = {
    "type": "object",
    "properties": {
        "chosenAnswers": chosenAnswersArray,
        "bookmarkedTopics": topicsIdsArray,
        "completedTopics": topicsIdsArray,
        "showOnboarding": {
            "type": "boolean"
        },
        "bookmarkedServices": serviceMap,
        "showPartialLocalizationMessage": {
            "type": "boolean"
        },
        "disableAnalytics": {
            "type": "boolean"
        },
        "searchTerm": {
            "type": "string"
        },
        "searchLocation": {
            "type": "string"
        },
        "searchLatLong": latLong,
        "searchResults": serviceSearchItemArray,
        "collapseSearchInput": {
            "type": "boolean"
        },
        "reviewedServices": reviewedServicesIdsArray,
    }
};