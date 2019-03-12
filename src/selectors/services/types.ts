import { Service } from '../../stores/services';
import { ErrorMessageType } from '../../stores/services';

export interface ValidSelectorTaskServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'TaskServices:Valid';
}

export interface LoadingSelectorTaskServices {
    readonly type: 'TaskServices:Loading';
}

export interface ErrorSelectorTaskServices {
    readonly errorMessageType: ErrorMessageType;
    readonly type: 'TaskServices:Error';
}

export type SelectorTaskServices = ValidSelectorTaskServices | LoadingSelectorTaskServices | ErrorSelectorTaskServices;
