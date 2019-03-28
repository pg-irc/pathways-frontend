import { Service } from '../../stores/services';
import { ServicesErrorType } from '../../sagas/services';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'TopicServices:Valid';
}

export interface LoadingSelectorTopicServices {
    readonly type: 'TopicServices:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType: ServicesErrorType;
    readonly type: 'TopicServices:Error';
}

export type SelectorTopicServices = ValidSelectorTopicServices | LoadingSelectorTopicServices | ErrorSelectorTopicServices;
