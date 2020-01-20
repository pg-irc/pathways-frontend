import { HumanServiceData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly type: 'ServicesForTopic:Valid';
    readonly isExpired: boolean;
}

export interface LoadingSelectorTopicServices {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType: Errors;
    readonly type: 'ServicesForTopic:Error';
}

export interface InitialEmptySelectorTopicServices {
    readonly type: 'ServicesForTopic:InitialEmpty';
}

export type SelectorTopicServices =
    ValidSelectorTopicServices |
    LoadingSelectorTopicServices |
    ErrorSelectorTopicServices |
    InitialEmptySelectorTopicServices;
