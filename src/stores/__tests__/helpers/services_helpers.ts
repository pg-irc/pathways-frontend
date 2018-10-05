// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { Id } from '../../services';
import { Id as TaskId } from '../../tasks';
import { TaskServices, Service, TaskServicesMap, ServiceMap, ServiceStore, PhoneNumber, Address, FullAddress } from '../../services/types';


export function buildNormalizedServices(tasks: ReadonlyArray<TaskServicesBuilder>, services: ReadonlyArray<ServiceBuilder>): ServiceStore {
    return {
        serviceMap: buildServiceMap(services),
        taskServicesMap: buildTaskServicesMap(tasks, services),
    };
}

function buildServiceMap(services: ReadonlyArray<ServiceBuilder>): ServiceMap {
    const buildAndMapToId = (map: ServiceMap, builder: ServiceBuilder): ServiceMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return services.reduce(buildAndMapToId, {});
}

function buildTaskServicesMap(tasks: ReadonlyArray<TaskServicesBuilder>, services: ReadonlyArray<ServiceBuilder>): TaskServicesMap {
    const buildAndMapToId = (map: TaskServicesMap, builder: TaskServicesBuilder): TaskServicesMap => {
        const serviceIds = services.map((service: ServiceBuilder) => service.id);
        return { ...map, [builder.id]: builder.withServiceIds(serviceIds).build() };
    };
    return tasks.reduce(buildAndMapToId, {});
}

export class PhoneNumberBuilder {
    static buildArray(length: number = 3): ReadonlyArray<PhoneNumber> {
        return Array(length).fill(new PhoneNumberBuilder().build());
    }

    type: string = aString();
    phoneNumber: string = aString();

    withType(type: string): PhoneNumberBuilder {
        this.type = type;
        return this;
    }

    withPhoneNumber(phoneNumber: string): PhoneNumberBuilder {
        this.phoneNumber = phoneNumber;
        return this;
    }

    build(): PhoneNumber {
        return {
            type: this.type,
            phoneNumber: this.phoneNumber,
        };
    }
}

export class FullAddressBuilder {
    static buildArray(): FullAddress {
        return new FullAddressBuilder().build();
    }

    type: string = aString();
    address: Address;

    withType(type: string): FullAddressBuilder {
        this.type = type;
        return this;
    }

    withAddress(address: Address): FullAddressBuilder {
        this.address = address;
        return this;
    }

    build(): FullAddress {
        return {
            type: this.type,
            address:  this.address,
        };
    }
}

export class AddressBuilder {
    static buildArray(): Address {
        return new AddressBuilder().build();
    }

    id: string = aString();
    address: string = aString();
    city: string = aString();
    state_province: string = aString();
    postal_code: string = aString();
    country: string = aString();

    withId(id: string): AddressBuilder {
        this.id = id;
        return this;
    }

    withAddress(address: string): AddressBuilder {
        this.address = address;
        return this;
    }

    withCity(city: string): AddressBuilder {
        this.city = city;
        return this;
    }

    withStateProvince(state_province: string): AddressBuilder {
        this.state_province = state_province;
        return this;
    }

    withPostalCode(postal_code: string): AddressBuilder {
        this.postal_code = postal_code;
        return this;
    }

    withCountry(country: string): AddressBuilder {
        this.country = country;
        return this;
    }

    build(): Address {
        return {
            // id: this.id,
            address: this.address,
            city: this.city,
            state_province: this.state_province,
            postal_code: this.postal_code,
            country: this.country,
            
        };
    }
}

export class ServiceBuilder {
    id: Id = aString();
    name: string = aString();
    description: string = aString();
    phoneNumbers: ReadonlyArray<PhoneNumber> = PhoneNumberBuilder.buildArray();
    fullAddresses: FullAddress = FullAddressBuilder.buildArray();

    withId(id: Id): ServiceBuilder {
        this.id = id;
        return this;
    }

    withName(name: string): ServiceBuilder {
        this.name = name;
        return this;
    }

    withDescription(description: string): ServiceBuilder {
        this.description = description;
        return this;
    }

    withPhoneNumbers(phoneNumbers: ReadonlyArray<PhoneNumber>): ServiceBuilder {
        this.phoneNumbers = phoneNumbers;
        return this;
    }

    withFullAddresses(fullAddresses: FullAddress): ServiceBuilder {
        this.fullAddresses = fullAddresses;
        return this;
    }

    build(): Service {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            phoneNumbers: this.phoneNumbers,
            fullAddresses: this.fullAddresses
        };
    }
}

export class TaskServicesBuilder {
    id: TaskId = aString();
    loading: boolean = false;
    message: string = aString();
    serviceIds: ReadonlyArray<Id> = [];

    withTaskId(id: TaskId): TaskServicesBuilder {
        this.id = id;
        return this;
    }

    withLoading(loading: boolean): TaskServicesBuilder {
        this.loading = loading;
        return this;
    }

    withMessage(message: string): TaskServicesBuilder {
        this.message = message;
        return this;
    }

    withServiceIds(serviceIds: ReadonlyArray<Id>): TaskServicesBuilder {
        this.serviceIds = serviceIds;
        return this;
    }

    build(): TaskServices {
        return {
            loading: this.loading,
            message: this.message,
            serviceIds: this.serviceIds,
        };
    }
}