import { Service } from '../../stores/services';
import { ServicesErrorType } from '../../sagas/services';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'ServicesForTopic:Valid';
}

export interface LoadingSelectorTopicServices {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType: ServicesErrorType;
    readonly type: 'ServicesForTopic:Error';
}

export type SelectorTopicServices = ValidSelectorTopicServices | LoadingSelectorTopicServices | ErrorSelectorTopicServices;
