// tslint:disable:quotemark trailing-comma
import { phoneNumberArray, addressWithTypeArray } from "../services/schema";

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
    "required": ["lat", "long"]
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
        }
    }
};

export const userData = {
    "type": "object",
    "properties": {
        "chosenAnswers": chosenAnswersArray,
        "savedTopics": topicsIdsArray,
        "completedTopics": topicsIdsArray,
        "showOnboarding": {
            "type": "boolean"
        },
        "savedServices": serviceMap
    }
};