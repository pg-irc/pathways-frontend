import { HumanServiceData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';

export interface SelectorValidServicesForTopic {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly type: 'ServicesForTopic:Valid';
    readonly isExpired: boolean;
}

export interface SelectorLoadingServicesForTopic {
    readonly type: 'ServicesForTopic:Loading';
}

export interface SelectorErrorServicesForTopic {
    readonly errorMessageType: Errors;
    readonly type: 'ServicesForTopic:Error';
}

export interface SelectorInitialEmptyServicesForTopic {
    readonly type: 'ServicesForTopic:InitialEmpty';
}

export type SelectorTopicServices =
    SelectorValidServicesForTopic |
    SelectorLoadingServicesForTopic |
    SelectorErrorServicesForTopic |
    SelectorInitialEmptyServicesForTopic;
