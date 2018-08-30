export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { UserData, chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { Store, ValidStore } from './stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { Store, ValidStore, LoadingStore, InvalidStore } from './stores';
import { reduceValidStore } from './reduce_valid_store';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';

export const reducer = (store: Store = buildDefaultStore(), action?: QuestionnaireAction): Store => {
    if (store instanceof ValidStore) {
        return reduceValidStore(store, action);
    }
    if (store instanceof LoadingStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InvalidStore) {
        return reduceInvalidStore(store, action);
    }
    return store;
};

const buildDefaultStore = (): ValidStore => (
    buildQuestionnaireFixture()
);

export const isValid = (store: Store): boolean => (
    store instanceof ValidStore
);

export const isLoading = (store: Store): boolean => (
    store instanceof LoadingStore
);

export const isInvalid = (store: Store): boolean => (
    store instanceof InvalidStore
);
