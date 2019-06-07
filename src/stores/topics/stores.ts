// tslint:disable:no-class no-expression-statement no-this

import { ValidTopicStore } from '../../fixtures/types/topics';
export { ValidTopicStore } from '../../fixtures/types/topics';

export class InValidTopicStore {
    readonly lastValidState: ValidTopicStore;
    readonly error: string;

    constructor(lastValidState: ValidTopicStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
}

export class LoadingTopicStore {
    readonly lastValidState: ValidTopicStore;

    constructor(lastValidState: ValidTopicStore) {
        this.lastValidState = lastValidState;
    }
}

export type TopicStore = ValidTopicStore | InValidTopicStore | LoadingTopicStore;

export const toValidOrThrow = (store: TopicStore): ValidTopicStore => {
    if (store instanceof ValidTopicStore) {
        return store;
    }
    throw new Error('Tried to access invalid topic store');
};
