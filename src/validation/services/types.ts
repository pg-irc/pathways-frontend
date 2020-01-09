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
    readonly type: 'ServicesForTopic:Valid';
    readonly serviceIds: ReadonlyArray<Id>;
    readonly expiresAt: number;
}

export interface LoadingServicesForTopic {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorServicesForTopic {
    readonly type: 'ServicesForTopic:Error';
    readonly errorMessageType: Errors;
}

export type ServicesForTopic = ValidServicesForTopic | LoadingServicesForTopic | ErrorServicesForTopic;

export interface ServicesForAllTopics {
    readonly [topicId: string]: ServicesForTopic;
}

export const isServiceLoading = (services: ServicesForTopic): boolean => (
    services.type === constants.TOPIC_SERVICES_LOADING
);

export interface ServiceMap {
    readonly [serviceId: string]: HumanServiceData;
}

export interface ServiceStore {
    readonly services: ServiceMap;
    readonly servicesByTopic: ServicesForAllTopics;
}
