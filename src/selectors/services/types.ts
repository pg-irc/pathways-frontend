import { HumanServiceData } from '../../validation/services/types';
import { Errors } from '../../validation/errors/types';

export interface SelectorValidServicesForTopic {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly type: 'SERVICES_FOR_TOPIC:VALID';
}

export interface SelectorLoadingServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:LOADING';
}

export interface SelectorErrorServicesForTopic {
    readonly errorMessageType: Errors;
    readonly type: 'SERVICES_FOR_TOPIC:ERROR';
}

export interface SelectorInitialEmptyServicesForTopic {
    readonly type: 'SERVICES_FOR_TOPIC:INITIAL_EMPTY';
}

export type SelectorTopicServices =
    SelectorValidServicesForTopic |
    SelectorLoadingServicesForTopic |
    SelectorErrorServicesForTopic |
    SelectorInitialEmptyServicesForTopic;
