export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { LocalStorage, chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { AnyTaggedStore, ValidStore } from './tagged_stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { AnyTaggedStore, tagAsValid, TaggedValidStore } from './tagged_stores';
import { VALID_STORE_TAG, LOADING_STORE_TAG, INVALID_STORE_TAG } from '../../application/constants';
import { validStoreReducer } from './valid_store_reducer';
import { loadingStoreReducer } from './loading_store_reducer';
import { invalidStoreReducer } from './invalid_store_reducer';

export const reducer = (taggedStore: AnyTaggedStore = buildDefaultStore(), action?: QuestionnaireAction): AnyTaggedStore => {
    switch (taggedStore.tag) {
        case VALID_STORE_TAG:
            return validStoreReducer(taggedStore.store, action);

        case LOADING_STORE_TAG:
            return loadingStoreReducer(taggedStore.store, action);

        case INVALID_STORE_TAG:
            return invalidStoreReducer(taggedStore.store, action);

        default:
            return taggedStore;
    }
};

const buildDefaultStore = (): TaggedValidStore => (
    tagAsValid(buildQuestionnaireFixture())
);

export const isLoading = (store: AnyTaggedStore): boolean => (
    store.tag === LOADING_STORE_TAG
);
