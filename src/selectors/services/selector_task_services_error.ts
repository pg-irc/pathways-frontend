import { ErrorMessageType } from '../../stores/services';

export interface SelectorTaskServicesError {
    readonly loading: boolean;
    readonly errorMessageType: ErrorMessageType;
}