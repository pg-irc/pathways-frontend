// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';
import { Id } from '../../services';
import { Id as TaskId } from '../../tasks';
import { TaskServices, Service, TaskServicesMap, ServiceMap, ServiceStore, PhoneNumber, Address } from '../../services/types';

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

export class AddressBuilder {
    id: number = aNumber();
    type: string = aString();
    address: string = aString();
    city: string = aString();
    stateProvince: string = aString();
    postalCode: string = aString();
    country: string = aString();

    build(): Address {
        return {
            id: this.id,
            type: this.type,
            address: this.address,
            city: this.city,
            stateProvince: this.stateProvince,
            postalCode: this.postalCode,
            country: this.country,
        };
    }
}

export class ServiceBuilder {
    id: Id = aString();
    name: string = aString();
    description: string = aString();
    phoneNumbers: ReadonlyArray<PhoneNumber> = [];
    addresses: ReadonlyArray<Address> = [];

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

    withAddresses(addresses: ReadonlyArray<Address>): ServiceBuilder {
        this.addresses = addresses;
        return this;
    }

    build(): Service {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            phoneNumbers: this.phoneNumbers,
            addresses: this.addresses,
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
