import { Service } from '../../stores/services';
import { ErrorMessageType } from '../../stores/services';

export interface SelectorTaskServices {
    readonly loading: boolean;
    readonly services: ReadonlyArray<Service>;
    readonly type: 'TaskServices:Valid';
}

export interface SelectorTaskServicesLoading {
    readonly loading: boolean;
    readonly type: 'TaskServices:Loading';
}

export interface SelectorTaskServicesError {
    readonly errorMessageType: ErrorMessageType;
    readonly type: 'TaskServices:Error';
}

export type SelectorTaskServicesOrError = SelectorTaskServices | SelectorTaskServicesLoading | SelectorTaskServicesError;
