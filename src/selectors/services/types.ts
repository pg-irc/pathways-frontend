import { Service } from '../../stores/services';
import { ErrorMessageType } from '../../stores/services';

export interface SelectorTaskServices {
    readonly loading: boolean;
    readonly services: ReadonlyArray<Service>;
}

export interface SelectorTaskServicesLoading {
    readonly loading: boolean;
}

export interface SelectorTaskServicesError {
    readonly loading: boolean;
    readonly errorMessageType: ErrorMessageType;
}

export type SelectorTaskServicesOrError = SelectorTaskServices | SelectorTaskServicesLoading | SelectorTaskServicesError;
