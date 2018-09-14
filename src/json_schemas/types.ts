export interface JSONSchemaPhoneNumber {
    readonly phone_number_type: string;
    readonly phone_number: string;
}

export interface JSONSchemaService {
    readonly id: string;
    readonly name: string;
    readonly description: string;
}

export interface JSONSchemaLocation {
    readonly phone_numbers: ReadonlyArray<JSONSchemaPhoneNumber>;
}

export interface JSONSchemaServiceAtLocation {
    readonly service: JSONSchemaService;
    readonly location: JSONSchemaLocation;
}
