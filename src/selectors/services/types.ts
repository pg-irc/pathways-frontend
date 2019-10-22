import { Service } from '../../validation/services/types';
import { Errors } from '../../errors/types';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'ServicesForTopic:Valid';
}

export interface LoadingSelectorTopicServices {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType: Errors;
    readonly type: 'ServicesForTopic:Error';
}

export type SelectorTopicServices = ValidSelectorTopicServices | LoadingSelectorTopicServices | ErrorSelectorTopicServices;
