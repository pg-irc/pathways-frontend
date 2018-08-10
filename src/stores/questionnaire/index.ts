export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { LocalStorage, chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { AnyTaggedStore, Store } from './tagged_stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { Store, AnyTaggedStore, InvalidStore, LoadingStore } from './tagged_stores';
import { reduceValidStore } from './reduce_valid_store';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';

export const reducer = (store: AnyTaggedStore = buildDefaultStore(), action?: QuestionnaireAction): AnyTaggedStore => {
    if (store instanceof Store) {
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

const buildDefaultStore = (): Store => (
    new Store(buildQuestionnaireFixture())
);

export const isValid = (store: AnyTaggedStore): boolean => (
    store instanceof Store
);

export const isLoading = (store: AnyTaggedStore): boolean => (
    store instanceof LoadingStore
);

export const isInvalid = (store: AnyTaggedStore): boolean => (
    store instanceof InvalidStore
);
