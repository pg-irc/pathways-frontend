export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { LocalStorage, chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { AnyTaggedStore, ValidStore } from './tagged_stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { AnyTaggedStore, tagAsValid, TaggedValidStore } from './tagged_stores';
import { VALID_STORE_TAG, LOADING_STORE_TAG, INVALID_STORE_TAG } from '../../application/constants';
import { reduceValidStore } from './reduce_valid_store';
import { reduceLoadingStore } from './reduce_loading_store';
import { reduceInvalidStore } from './reduce_invalid_store';

export const reducer = (taggedStore: AnyTaggedStore = buildDefaultStore(), action?: QuestionnaireAction): AnyTaggedStore => {
    switch (taggedStore.tag) {
        case VALID_STORE_TAG:
            return reduceValidStore(taggedStore.store, action);

        case LOADING_STORE_TAG:
            return reduceLoadingStore(taggedStore.store, action);

        case INVALID_STORE_TAG:
            return reduceInvalidStore(taggedStore.store, action);

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
