// tslint:disable:no-class no-expression-statement no-this

import { ValidQuestionnaireStore } from '../../fixtures/types/questionnaire';
export { ValidQuestionnaireStore } from '../../fixtures/types/questionnaire';

export class InvalidQuestionnaireStore {
    readonly lastValidState: ValidQuestionnaireStore;
    readonly error: string;

    constructor(lastValidState: ValidQuestionnaireStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
}

export class LoadingQuestionnaireStore {
    readonly lastValidState: ValidQuestionnaireStore;

    constructor(lastValidState: ValidQuestionnaireStore) {
        this.lastValidState = lastValidState;
    }
}

export type QuestionnaireStore = ValidQuestionnaireStore | InvalidQuestionnaireStore | LoadingQuestionnaireStore;

export const toValidOrThrow = (store: QuestionnaireStore): ValidQuestionnaireStore => {
    if (store instanceof ValidQuestionnaireStore) {
        return store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};
