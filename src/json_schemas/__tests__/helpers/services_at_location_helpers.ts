import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { JSONSchemaLocation, JSONSchemaPhoneNumber, JSONSchemaService, JSONSchemaServiceAtLocation } from '../../types';

export const buildJSONSchemaPhoneNumber = (): JSONSchemaPhoneNumber => (
    {
        phone_number_type: aString(),
        phone_number: aString(),
    }
);

export const buildJSONSchemaService = (): JSONSchemaService => (
    {
        id: aString(),
        name: aString(),
        description: aString(),
    }
);

export const buildJSONSchemaLocation = (): JSONSchemaLocation => (
    {
        phone_numbers: [buildJSONSchemaPhoneNumber()],
    }
);

export const buildJSONSchemaServiceAtLocation = (): JSONSchemaServiceAtLocation => (
    {
        service: buildJSONSchemaService(),
        location: buildJSONSchemaLocation(),
    }
);