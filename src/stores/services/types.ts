import { LocalizedText } from '../../locale';

export type Id = string;

export interface APIPhoneNumber {
    readonly phone_number_type: string;
    readonly phone_number: string;
}

export interface PhoneNumber {
    readonly type: string;
    readonly phoneNumber: string;
}

export interface Service {
    readonly id: Id;
    readonly name: LocalizedText;
    readonly description: LocalizedText;
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
}

export interface TaskServices {
    readonly loading: boolean;
    readonly serviceIds: ReadonlyArray<Id>;
    readonly message: string;
}

export interface ServiceMap {
    readonly [serviceId: string]: Service;
}

export interface TaskServicesMap {
    readonly [taskId: string]: TaskServices;
}

export interface ServiceStore {
    readonly serviceMap: ServiceMap;
    readonly taskServicesMap: TaskServicesMap;
}
