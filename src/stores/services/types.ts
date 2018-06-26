import { LocalizedText } from '../../locale';

type Id = string;

export interface Service {
    readonly id: Id;
    readonly name: LocalizedText;
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

export interface Store {
    readonly serviceMap: ServiceMap;
    readonly taskServicesMap: TaskServicesMap;
}
