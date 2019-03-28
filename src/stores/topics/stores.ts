// tslint:disable:no-class no-expression-statement no-this

import { ValidTopicStore } from '../../fixtures/types/topics';
export { ValidTopicStore as ValidTaskStore } from '../../fixtures/types/topics';

export class InvalidTaskStore {
    readonly lastValidState: ValidTopicStore;
    readonly error: string;

    constructor(lastValidState: ValidTopicStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
}

export class LoadingTaskStore {
    readonly lastValidState: ValidTopicStore;

    constructor(lastValidState: ValidTopicStore) {
        this.lastValidState = lastValidState;
    }
}

export type TaskStore = ValidTopicStore | InvalidTaskStore | LoadingTaskStore;

export const toValidOrThrow = (store: TaskStore): ValidTopicStore => {
    if (store instanceof ValidTopicStore) {
        return store;
    }
    throw new Error('Tried to access invalid topic store');
};
