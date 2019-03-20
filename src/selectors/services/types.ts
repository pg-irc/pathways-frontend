import { Service } from '../../stores/services';
import { ServicesErrorType } from '../../sagas/services';

export interface ValidSelectorTaskServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'TaskServices:Valid';
}

export interface LoadingSelectorTaskServices {
    readonly type: 'TaskServices:Loading';
}

export interface ErrorSelectorTaskServices {
    readonly errorMessageType: ServicesErrorType;
    readonly type: 'TaskServices:Error';
}

export type SelectorTaskServices = ValidSelectorTaskServices | LoadingSelectorTaskServices | ErrorSelectorTaskServices;
