export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { QuestionnaireStore, ValidQuestionnaireStore } from './stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { QuestionnaireStore, ValidQuestionnaireStore, LoadingQuestionnaireStore, InvalidQuestionnaireStore } from './stores';
import { reduceValidStore } from './reduce_valid_store';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';

export const reducer = (store: QuestionnaireStore = buildDefaultStore(), action?: QuestionnaireAction): QuestionnaireStore => {
    if (store instanceof ValidQuestionnaireStore) {
        return reduceValidStore(store, action);
    }
    if (store instanceof LoadingQuestionnaireStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InvalidQuestionnaireStore) {
        return reduceInvalidStore(store, action);
    }
    return store;
};

export const buildDefaultStore = (): ValidQuestionnaireStore => (
    buildQuestionnaireFixture()
);

export const isValid = (store: QuestionnaireStore): boolean => (
    store instanceof ValidQuestionnaireStore
);

export const isLoading = (store: QuestionnaireStore): boolean => (
    store instanceof LoadingQuestionnaireStore
);

export const isInvalid = (store: QuestionnaireStore): boolean => (
    store instanceof InvalidQuestionnaireStore
);
