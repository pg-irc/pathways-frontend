import * as constants from '../../application/constants';
import { Errors } from '../errors/types';
import { LatLong } from '../latlong/types';

export type Id = string;

export interface PhoneNumber {
    readonly type: string;
    readonly phone_number: string;
}

export interface Address {
    readonly id: number;
    readonly type: string;
    readonly address: string;
    readonly city: string;
    readonly stateProvince: string;
    readonly postalCode: string;
    readonly country: string;
}

export interface HumanServiceData {
    readonly id: Id;
    readonly services_at_location_id?: number;
    readonly latlong?: LatLong;
    readonly name: string;
    readonly description: string;
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly addresses: ReadonlyArray<Address>;
    readonly website: string;
    readonly email: string;
    readonly organizationName: string;
    readonly bookmarked: boolean;
}

export interface ValidServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:VALID';
    readonly serviceIds: ReadonlyArray<Id>;
}

export interface LoadingServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:LOADING';
}

export interface ErrorServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:ERROR';
    readonly errorMessageType: Errors;
}

export interface InitialEmptyServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:INITIAL_EMPTY';
}

export type ServicesForTopic = ValidServicesForTopic | LoadingServicesForTopic | ErrorServicesForTopic | InitialEmptyServicesForTopic;

export interface ServicesForAllTopics {
    readonly [topicId: string]: ServicesForTopic;
}

export const isServiceLoading = (services: ServicesForTopic): boolean => (
    services.type === constants.LOADING_SERVICES_FOR_TOPIC
);

export interface ServiceMap {
    readonly [serviceId: string]: HumanServiceData;
}

export interface ServiceStore {
    readonly services: ServiceMap;
    readonly servicesByTopic: ServicesForAllTopics;
}
