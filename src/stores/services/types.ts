import * as constants from '../../application/constants';
import { ServicesErrorType } from '../../sagas/services';

export type Id = string;

export interface PhoneNumber {
    readonly type: string;
    readonly phoneNumber: string;
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

export interface Service {
    readonly id: Id;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly name: string;
    readonly description: string;
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly addresses: ReadonlyArray<Address>;
    readonly website: string;
    readonly email: string;
    readonly organizationName: string;
}

export interface ValidTaskServices {
    readonly type: 'TaskServices:Valid';
    readonly serviceIds: ReadonlyArray<Id>;
}

export interface LoadingTaskServices {
    readonly type: 'TaskServices:Loading';
}

export interface ErrorTaskServices {
    readonly type: 'TaskServices:Error';
    readonly errorMessage: string;
    readonly errorMessageType: ServicesErrorType;
}

export type TaskServices = ValidTaskServices | LoadingTaskServices | ErrorTaskServices;

export interface TaskServicesMap {
    readonly [taskId: string]: TaskServices;
}

export const isServiceLoading = (services: TaskServices): boolean => (
    services.type === constants.TASK_SERVICES_LOADING
);

export interface ServiceMap {
    readonly [serviceId: string]: Service;
}

export interface ServiceStore {
    readonly services: ServiceMap;
    readonly taskServicesOrError: TaskServicesMap;
}

export interface ValidatedPhoneNumberJSON {
    readonly phone_number_type: string;
    readonly phone_number: string;
}

export interface ValidatedAddressJSON {
    readonly id: number;
    readonly address: string;
    readonly city: string;
    readonly state_province: string;
    readonly postal_code: string;
    readonly country: string;
}

export interface ValidatedAddressWithTypeJSON {
    readonly address_type: string;
    readonly address: ValidatedAddressJSON;
}

export interface ValidatedServiceJSON {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly organization_url: string;
    readonly organization_email: string;
    readonly organization_name: string;
}

export interface ValidatedLocationJSON {
    readonly latitude?: number;
    readonly longitude?: number;
    readonly phone_numbers: ReadonlyArray<ValidatedPhoneNumberJSON>;
    readonly addresses: ReadonlyArray<ValidatedAddressWithTypeJSON>;
}

export interface ValidatedServiceAtLocationJSON {
    readonly service: ValidatedServiceJSON;
    readonly location: ValidatedLocationJSON;
}
