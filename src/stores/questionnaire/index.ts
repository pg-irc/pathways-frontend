export { Id, Question, Answer, QuestionsMap, AnswersMap } from '../../fixtures/types/questionnaire';
export { Persistence, chooseAnswer, ChooseAnswerAction, setActiveQuestion, SetActiveQuestionAction } from './actions';
export { Store, ValidStore } from './tagged_stores';

import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { QuestionnaireAction } from './actions';
import { Store, VALID_STORE_TAG, asValid } from './tagged_stores';
import { validStoreReducer } from './valid_store';

export const reducer = (taggedStore: Store = buildDefaultStore(), action?: QuestionnaireAction): Store => {
    switch (taggedStore.tag) {
        case VALID_STORE_TAG:
            return validStoreReducer(taggedStore.store, action);
        default:
            return taggedStore;
    }
};

const buildDefaultStore = (): Store => (
    asValid(buildQuestionnaireFixture())
);
