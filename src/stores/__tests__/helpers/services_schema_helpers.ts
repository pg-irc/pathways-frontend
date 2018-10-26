// tslint:disable:no-class readonly-keyword no-expression-statement no-this no-let no-any
import { aString, anInteger } from '../../../application/__tests__/helpers/random_test_values';

interface PhoneNumberJSON {
    readonly phone_number_type?: any;
    readonly phone_number?: any;
}

interface AddressJSON {
    readonly id?: any;
    readonly address?: any;
    readonly city?: any;
    readonly state_province?: any;
    readonly postal_code?: any;
    readonly country?: any;
}

interface AddressWithTypeJSON {
    readonly address_type?: any;
    readonly address?: AddressJSON | null;
}

interface ServiceJSON {
    readonly id?: any;
    readonly name?: any;
    readonly description?: any;
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
    phone_number_type: any = aString();
    phone_number: any = aString();

    withPhoneNumberType(phoneNumberType: any): PhoneNumberJSONBuilder {
        this.phone_number_type = phoneNumberType;
        return this;
    }

    withPhoneNumber(phoneNumber: any): PhoneNumberJSONBuilder {
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
    id: any = anInteger();
    address: any = aString();
    city: any = aString();
    state_province: any = aString();
    postal_code: any = aString();
    country: any = aString();

    withId(id: any): AddressJSONBuilder {
        this.id = id;
        return this;
    }

    withAddress(address: any): AddressJSONBuilder {
        this.address = address;
        return this;
    }

    withCity(city: any): AddressJSONBuilder {
        this.city = city;
        return this;
    }

    withStateProvince(stateProvince: any): AddressJSONBuilder {
        this.state_province = stateProvince;
        return this;
    }

    withPostalCode(postalCode: any): AddressJSONBuilder {
        this.postal_code = postalCode;
        return this;
    }

    withCountry(country: any): AddressJSONBuilder {
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

    buildWithoutId(): AddressJSON {
        return {
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutAddress(): AddressJSON {
        return {
            id: this.id,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutCity(): AddressJSON {
        return {
            id: this.id,
            address: this.address,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutStateProvince(): AddressJSON {
        return {
            id: this.id,
            address: this.address,
            city: this.city,
            postal_code: this.postal_code,
            country: this.country,
        };
    }

    buildWithoutPostalCode(): AddressJSON {
        return {
            id: this.id,
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            country: this.country,
        };
    }
    buildWithoutCountry(): AddressJSON {
        return {
            id: this.id,
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
        };
    }
}

export class AddressWithTypeJSONBuilder {
    address_type: any = aString();
    address: AddressJSON | null = new AddressJSONBuilder().build();

    withAddressType(addressType: any): AddressWithTypeJSONBuilder {
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
    id: any = aString();
    name: any = aString();
    description: any = aString();

    withId(id: any): ServiceJSONBuilder {
        this.id = id;
        return this;
    }

    withName(name: any): ServiceJSONBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: any): ServiceJSONBuilder {
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

    withAddressesWithType(addresses: ReadonlyArray<AddressWithTypeJSON> | null): LocationJSONBuilder {
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
