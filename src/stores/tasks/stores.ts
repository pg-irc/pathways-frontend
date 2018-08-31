// tslint:disable:no-class no-expression-statement no-this

import { ValidTaskStore } from '../../fixtures/types/tasks';
export { ValidTaskStore } from '../../fixtures/types/tasks';

export class InvalidTaskStore {
    readonly lastValidState: ValidTaskStore;
    readonly error: string;

    constructor(lastValidState: ValidTaskStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
}

export class LoadingTaskStore {
    readonly lastValidState: ValidTaskStore;

    constructor(lastValidState: ValidTaskStore) {
        this.lastValidState = lastValidState;
    }
}

export type TaskStore = ValidTaskStore | InvalidTaskStore | LoadingTaskStore;

export const toValidOrThrow = (store: TaskStore): ValidTaskStore => {
    if (store instanceof ValidTaskStore) {
        return store;
    }
    throw new Error('Tried to access invalid task store');
};
