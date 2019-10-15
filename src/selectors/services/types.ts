import { Service } from '../../stores/services/types';
import { Errors } from '../../errors/types';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'ServicesForTopic:Valid';
}

export interface LoadingSelectorTopicServices {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType?: Errors;
    readonly type: 'ServicesForTopic:Error';
}

export interface EmptySelectorTopicServices {
    readonly type: 'ServicesForTopic:Empty';
}

export type SelectorTopicServices = ValidSelectorTopicServices | LoadingSelectorTopicServices |
ErrorSelectorTopicServices | EmptySelectorTopicServices;
