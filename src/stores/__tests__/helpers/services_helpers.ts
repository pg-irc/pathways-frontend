// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { aString, aNumber } from '../../../helpers/random_test_values';
import { Id } from '../../services';
import { Errors } from '../../../validation/errors/types';
import {
    ValidServicesForTopic, LoadingServicesForTopic, HumanServiceData, ServiceMap,
    ServiceStore, PhoneNumber, Address, ErrorServicesForTopic,
    ServicesForAllTopics,
    ServicesForTopic,
} from '../../../validation/services/types';
import * as constants from '../../../application/constants';

export const buildNormalizedServices = (
    services: ReadonlyArray<ServiceBuilder>,
    servicesForTopicOrError: ReadonlyArray<ServicesForTopicBuilder | ServicesForTopicErrorBuilder>,
    serviceFeedbackEnabled: boolean,
): ServiceStore => ({
    services: buildServiceMap(services),
    servicesByTopic: buildServicesForTopicOrErrorMap(servicesForTopicOrError),
    serviceFeedbackEnabled,
});

export const buildNormalizedServicesFromBuilders = (
    services: ReadonlyArray<HumanServiceData>,
    servicesForTopic: ReadonlyArray<ServicesForTopic>,
    serviceFeedbackEnabled: boolean,
): ServiceStore => ({
    services: buildServiceMapFromBuilder(services),
    servicesByTopic: buildServicesForTopicMapFromBuilder(servicesForTopic),
    serviceFeedbackEnabled,
});

export const buildServiceMap = (services: ReadonlyArray<ServiceBuilder>): ServiceMap => {
    const buildAndMapToId = (map: ServiceMap, builder: ServiceBuilder): ServiceMap => {
        return { ...map, [builder.id]: builder.build() };
    };
    return services.reduce(buildAndMapToId, {});
};

export const buildServiceMapFromBuilder = (services: ReadonlyArray<HumanServiceData>): ServiceMap => {
    const buildAndMapToId = (map: ServiceMap, service: HumanServiceData): ServiceMap => {
        return { ...map, [service.id]: service };
    };
    return services.reduce(buildAndMapToId, {});
};

const buildServicesForTopicOrErrorMap = (
    servicesForTopicOrError: ReadonlyArray<ServicesForTopicBuilder | ServicesForTopicErrorBuilder>,
): ServicesForAllTopics => {
    const buildAndMapToId = (map: ServicesForAllTopics, builder: ServicesForTopicBuilder | ServicesForTopicErrorBuilder):
        ServicesForAllTopics => {
        return { ...map, [builder.topicId]: builder.build() };
    };
    return servicesForTopicOrError.reduce(buildAndMapToId, {});
};

const buildServicesForTopicMapFromBuilder = (servicesForTopicOrError: ReadonlyArray<ServicesForTopic>): ServicesForAllTopics => {
    const buildAndMapToId = (map: ServicesForAllTopics, servicesForTopic: ServicesForTopic): ServicesForAllTopics => {
        const topicId = aString();
        return { ...map, [topicId]: servicesForTopic };
    };
    return servicesForTopicOrError.reduce(buildAndMapToId, {});
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
            phone_number: this.phoneNumber,
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
    bookmarked: boolean = false;

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

    withBookmarked(bookmarked: boolean): ServiceBuilder {
        this.bookmarked = bookmarked;
        return this;
    }

    build(): HumanServiceData {
        return {
            id: this.id,
            latlong: { lat: this.latitude, lng: this.longitude },
            name: this.name,
            description: this.description,
            phoneNumbers: this.phoneNumbers,
            addresses: this.addresses,
            website: this.website,
            email: this.email,
            organizationName: this.organizationName,
            bookmarked: this.bookmarked,
        };
    }
}

export class ServicesForTopicBuilder {
    topicId: string = aString();
    loading: boolean = false;
    message: string = aString();
    serviceIds: ReadonlyArray<Id> = [];
    expiresAt: number = Date.now();

    withLoading(loading: boolean): ServicesForTopicBuilder {
        this.loading = loading;
        return this;
    }

    withServiceIds(serviceIds: ReadonlyArray<Id>): ServicesForTopicBuilder {
        this.serviceIds = serviceIds;
        return this;
    }

    withExpiresAt(expiresAt: number): ServicesForTopicBuilder {
        this.expiresAt = expiresAt;
        return this;
    }

    build(): ValidServicesForTopic | LoadingServicesForTopic {
        if (this.loading) {
            return {
                type: constants.LOADING_SERVICES_FOR_TOPIC,
            };
        }
        return {
            type: constants.VALID_SERVICES_FOR_TOPIC,
            serviceIds: this.serviceIds,
            expiresAt: this.expiresAt,
        };
    }
}

export class ServicesForTopicErrorBuilder {
    topicId: string = aString();
    loading: boolean = false;
    errorMessageType: Errors = Errors.BadServerResponse;

    withLoading(loading: boolean): ServicesForTopicErrorBuilder {
        this.loading = loading;
        return this;
    }

    withErrorMessageType(errorMessageType: Errors): ServicesForTopicErrorBuilder {
        this.errorMessageType = errorMessageType;
        return this;
    }

    build(): ErrorServicesForTopic {
        return {
            type: constants.ERROR_SERVICES_FOR_TOPIC,
            errorMessageType: this.errorMessageType,
        };
    }
}
