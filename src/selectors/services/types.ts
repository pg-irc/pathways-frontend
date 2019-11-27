import { ServiceListData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';

export interface ValidSelectorTopicServices {
    readonly services: ServiceListData;
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
