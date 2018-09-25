// tslint:disable:no-class readonly-keyword no-expression-statement no-this no-let
import { aString } from '../../../application/__tests__/helpers/random_test_values';
interface PhoneNumberJSON {
    readonly phone_number_type?: string | null;
    readonly phone_number?: string | null;
}

interface ServiceJSON {
    readonly id?: string | null;
    readonly name?: string | null;
    readonly description?: string | null;
}

interface LocationJSON {
    readonly phone_numbers?: ReadonlyArray<PhoneNumberJSON>;
}

interface ServiceAtLocationJSON {
    readonly service?: ServiceJSON;
    readonly location?: LocationJSON;
}

export class PhoneNumberJSONBuilder {
    phone_number_type: string | null = aString();
    phone_number: string | null = aString();

    withPhoneNumberType(phoneNumberType: string | null): PhoneNumberJSONBuilder {
        this.phone_number_type = phoneNumberType;
        return this;
    }

    withPhoneNumber(phoneNumber: string | null): PhoneNumberJSONBuilder {
        this.phone_number = phoneNumber;
        return this;
    }

    build(): PhoneNumberJSON {
        return {
            phone_number_type: this.phone_number_type,
            phone_number: this.phone_number,
        };
    }

    buildWithoutPhoneNumberType(): PhoneNumberJSON {
        return {
            phone_number: this.phone_number,
        };
    }

    buildWithoutPhoneNumber(): PhoneNumberJSON {
        return {
            phone_number_type: this.phone_number_type,
        };
    }
}

export class ServiceJSONBuilder {
    id: string | null = aString();
    name: string | null = aString();
    description: string | null = aString();

    withId(id: string | null): ServiceJSONBuilder {
        this.id = id;
        return this;
    }

    withName(name: string | null): ServiceJSONBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: string | null): ServiceJSONBuilder {
        this.description = description;
        return this;
    }

    build(): ServiceJSON {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
        };
    }

    buildWithoutId(): ServiceJSON {
        return {
            name: this.name,
            description: this.description,
        };
    }

    buildWithoutName(): ServiceJSON {
        return {
            id: this.id,
            description: this.description,
        };
    }

    buildWithoutDescription(): ServiceJSON {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

export class LocationJSONBuilder {
    phone_numbers: ReadonlyArray<PhoneNumberJSON> | null = [new PhoneNumberJSONBuilder().build()];

    withPhoneNumbers(phoneNumbers: ReadonlyArray<PhoneNumberJSON> | null): LocationJSONBuilder {
        this.phone_numbers = phoneNumbers;
        return this;
    }

    build(): LocationJSON {
        return {
            phone_numbers: this.phone_numbers,
        };
    }

    buildWithoutPhoneNumbers(): LocationJSON {
        return {};
    }
}

export class ServiceAtLocationJSONBuilder {
    service: ServiceJSON | null = new ServiceJSONBuilder().build();
    location: LocationJSON | null = new LocationJSONBuilder().build();

    withService(service: ServiceJSON | null): ServiceAtLocationJSONBuilder {
        this.service = service;
        return this;
    }

    withLocation(location: LocationJSON | null): ServiceAtLocationJSONBuilder {
        this.location = location;
        return this;
    }

    build(): ServiceAtLocationJSON {
        return {
            service: this.service,
            location: this.location,
        };
    }

    buildWithoutService(): ServiceAtLocationJSON {
        return {
            location: this.location,
        };
    }

    buildWithoutLocation(): ServiceAtLocationJSON {
        return {
            service: this.service,
        };
    }
}
