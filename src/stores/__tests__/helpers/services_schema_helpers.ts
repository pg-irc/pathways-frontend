// tslint:disable:no-class readonly-keyword no-expression-statement no-this no-let
import { aString, anInteger } from '../../../application/__tests__/helpers/random_test_values';

interface PhoneNumberJSON {
    readonly phone_number_type?: string | null;
    readonly phone_number?: string | null;
}

interface AddressJSON {
    readonly id?: number | null;
    readonly address?: string | null;
    readonly city?: string | null;
    readonly state_province?: string | null;
    readonly postal_code?: string | null;
    readonly country?: string | null;
}

interface AddressWithTypeJSON {
    readonly address_type?: string | null;
    readonly address?: AddressJSON | null;
}

interface ServiceJSON {
    readonly id?: string | null;
    readonly name?: string | null;
    readonly description?: string | null;
}

interface LocationJSON {
    readonly phone_numbers?: ReadonlyArray<PhoneNumberJSON>;
    readonly addresses?: ReadonlyArray<AddressWithTypeJSON>;
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

export class AddressJSONBuilder {
    id: number = anInteger();
    address: string | null = aString();
    city: string | null = aString();
    state_province: string | null = aString();
    postal_code: string | null = aString();
    country: string | null = aString();

    withAddress(address: string | null): AddressJSONBuilder {
        this.address = address;
        return this;
    }

    withCity(city: string | null): AddressJSONBuilder {
        this.city = city;
        return this;
    }

    withStateProvince(stateProvince: string | null): AddressJSONBuilder {
        this.state_province = stateProvince;
        return this;
    }

    withPostalCode(postalCode: string | null): AddressJSONBuilder {
        this.postal_code = postalCode;
        return this;
    }

    withCountry(country: string | null): AddressJSONBuilder {
        this.country = country;
        return this;
    }

    build(): AddressJSON {
        return {
            id: this.id,
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutAddress(): AddressJSON {
        return {
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutCity(): AddressJSON {
        return {
            address: this.address,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutStateProvince(): AddressJSON {
        return {
            address: this.address,
            city: this.city,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutPostalCode(): AddressJSON {
        return {
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            country: this.country,
        };
    }
    buildWithoutCountry(): AddressJSON {
        return {
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
        };
    }
}

export class AddressWithTypeJSONBuilder {
    address_type: string | null = aString();
    address: AddressJSON | null = new AddressJSONBuilder().build();

    withAddressType(addressType: string | null): AddressWithTypeJSONBuilder {
        this.address_type = addressType;
        return this;
    }

    withAddress(address: AddressJSON | null): AddressWithTypeJSONBuilder {
        this.address = address;
        return this;
    }

    build(): AddressWithTypeJSON {
        return {
            address_type: this.address_type,
            address: this.address,
        };
    }

    buildWithoutAddressType(): AddressWithTypeJSON {
        return {
            address: this.address,
        };
    }

    buildWithoutAddress(): AddressWithTypeJSON {
        return {
            address_type: this.address_type,
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
    addresses: ReadonlyArray<AddressWithTypeJSON> | null = [new AddressWithTypeJSONBuilder().build()];

    withPhoneNumbers(phoneNumbers: ReadonlyArray<PhoneNumberJSON> | null): LocationJSONBuilder {
        this.phone_numbers = phoneNumbers;
        return this;
    }

    addressWithType(addresses: ReadonlyArray<AddressWithTypeJSON> | null): LocationJSONBuilder {
        this.addresses = addresses;
        return this;
    }

    build(): LocationJSON {
        return {
            phone_numbers: this.phone_numbers,
            addresses: this.addresses,
        };
    }

    buildWithoutPhoneNumbers(): LocationJSON {
        return { addresses: this.addresses };
    }

    buildWithoutAddresses(): LocationJSON {
        return { phone_numbers: this.phone_numbers };
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
