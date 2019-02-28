// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';
import { Id, ErrorMessageTypes } from '../../services';
import { Id as TaskId } from '../../tasks';
import {
    TaskServices, Service, TaskServicesMap, ServiceMap,
    ServiceStore, PhoneNumber, Address, TaskServicesError, TaskServicesErrorsMap,
} from '../../services/types';

export function buildNormalizedServices(
    tasks: ReadonlyArray<TaskServicesBuilder>,
    services: ReadonlyArray<ServiceBuilder>,
    errors: ReadonlyArray<TaskServicesErrorBuilder>): ServiceStore {
    return {
        serviceMap: buildServiceMap(services),
        taskServicesMap: buildTaskServicesMap(tasks, services),
        taskServicesErrors: buildErrorsMap(errors),
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

function buildErrorsMap(errors: ReadonlyArray<TaskServicesErrorBuilder>): TaskServicesErrorsMap {
    const buildAndMapToId = (map: TaskServicesErrorsMap, builder: TaskServicesErrorBuilder): TaskServicesErrorsMap => {
        return { ...map, [builder.taskId]:  builder.build() };
    };
    return errors.reduce(buildAndMapToId, {});
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
    latitude: number = aNumber();
    longitude: number = aNumber();
    name: string = aString();
    description: string = aString();
    phoneNumbers: ReadonlyArray<PhoneNumber> = [];
    addresses: ReadonlyArray<Address> = [];
    website: string = aString();
    email: string = aString();

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

    withLatitude(latitude: number): ServiceBuilder {
        this.latitude = latitude;
        return this;
    }

    withLongitude(longitude: number): ServiceBuilder {
        this.longitude = longitude;
        return this;
    }

    withWebsite(website: string): ServiceBuilder {
        this.website = website;
        return this;
    }

    withEmail(email: string): ServiceBuilder {
        this.email = email;
        return this;
    }

    build(): Service {
        return {
            id: this.id,
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
            description: this.description,
            phoneNumbers: this.phoneNumbers,
            addresses: this.addresses,
            website: this.website,
            email: this.email
        };
    }
}

export class TaskServicesBuilder {
    id: TaskId = aString();
    loading: boolean = false;
    message: string = aString();
    serviceIds: ReadonlyArray<Id> = [];

    withLoading(loading: boolean): TaskServicesBuilder {
        this.loading = loading;
        return this;
    }

    withServiceIds(serviceIds: ReadonlyArray<Id>): TaskServicesBuilder {
        this.serviceIds = serviceIds;
        return this;
    }

    build(): TaskServices {
        return {
            loading: this.loading,
            serviceIds: this.serviceIds,
        };
    }
}

export class TaskServicesErrorBuilder {
    taskId: TaskId = aString();
    errorMessage: string = aString();
    errorMessageType: ErrorMessageTypes = ErrorMessageTypes.Server;

    withTaskId(id: string): TaskServicesErrorBuilder {
        this.taskId = id;
        return this;
    }

    withErrorMessage(errorMessage: string): TaskServicesErrorBuilder {
        this.errorMessage = errorMessage;
        return this;
    }

    withErrorMessageType(errorMessageType: ErrorMessageTypes): TaskServicesErrorBuilder {
        this.errorMessageType = errorMessageType;
        return this;
    }

    build(): TaskServicesError {
        return {
            taskId: this.taskId,
            errorMessage: this.errorMessage,
            errorMessageType: this.errorMessageType,
        };
    }
}
