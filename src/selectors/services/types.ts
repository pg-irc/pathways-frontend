import { Service } from '../../stores/services';
import { ServicesErrorType } from '../../sagas/services';

export interface ValidSelectorTaskServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'TopicServices:Valid';
}

export interface LoadingSelectorTaskServices {
    readonly type: 'TopicServices:Loading';
}

export interface ErrorSelectorTaskServices {
    readonly errorMessageType: ServicesErrorType;
    readonly type: 'TopicServices:Error';
}

export type SelectorTaskServices = ValidSelectorTaskServices | LoadingSelectorTaskServices | ErrorSelectorTaskServices;
