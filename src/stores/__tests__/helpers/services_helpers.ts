// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString, aNumber } from '../../../application/__tests__/helpers/random_test_values';
import { Id } from '../../services';
import { Errors } from '../../../errors/types';
import {
    ValidServicesForTopic, LoadingServicesForTopic, Service, ServiceMap,
    ServiceStore, PhoneNumber, Address, ErrorServicesForTopic,
    ServicesForAllTopics,
} from '../../services/types';
import * as constants from '../../../application/constants';

export const buildNormalizedServices = (
    services: ReadonlyArray<ServiceBuilder>,
    taskServicesOrError: ReadonlyArray<TaskServicesBuilder | TaskServicesErrorBuilder>,
): ServiceStore => ({
    services: buildServiceMap(services),
    servicesByTopic: buildTaskServicesOrErrorMap(taskServicesOrError),
    savedServices: { type: 'ServicesForTopic:Empty'},
});

const buildServiceMap = (services: ReadonlyArray<ServiceBuilder>): ServiceMap => {
    const buildAndMapToId = (map: ServiceMap, builder: ServiceBuilder): ServiceMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return services.reduce(buildAndMapToId, {});
};

const buildTaskServicesOrErrorMap = (
    taskServicesOrError: ReadonlyArray<TaskServicesBuilder | TaskServicesErrorBuilder>,
): ServicesForAllTopics => {
    const buildAndMapToId = (map: ServicesForAllTopics, builder: TaskServicesBuilder | TaskServicesErrorBuilder):
        ServicesForAllTopics => {
        return { ...map, [builder.topicId]: builder.build() };
    };
    return taskServicesOrError.reduce(buildAndMapToId, {});
};

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
    organizationName: string = aString();

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

    withOrganizationName(organizationName: string): ServiceBuilder {
        this.organizationName = organizationName;
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
            email: this.email,
            organizationName: this.organizationName,
        };
    }
}

export class TaskServicesBuilder {
    topicId: string = aString();
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

    build(): ValidServicesForTopic | LoadingServicesForTopic {
        if (this.loading) {
            return {
                type: constants.TOPIC_SERVICES_LOADING,
            };
        }
        return {
            type: constants.TOPIC_SERVICES_VALID,
            serviceIds: this.serviceIds,
        };
    }
}

export class TaskServicesErrorBuilder {
    topicId: string = aString();
    loading: boolean = false;
    errorMessageType: Errors = Errors.BadServerResponse;

    withLoading(loading: boolean): TaskServicesErrorBuilder {
        this.loading = loading;
        return this;
    }

    withErrorMessageType(errorMessageType: Errors): TaskServicesErrorBuilder {
        this.errorMessageType = errorMessageType;
        return this;
    }

    build(): ErrorServicesForTopic {
        return {
            type: constants.TOPIC_SERVICES_ERROR,
            errorMessageType: this.errorMessageType,
        };
    }
}
