import * as constants from '../../application/constants';
import * as R from 'ramda';
import { Id, Answer, AnswersMap, Store } from '../../fixtures/types/questionnaire';
import { LoadingStore, AnyTaggedStore, InvalidStore } from './tagged_stores';
import { QuestionnaireAction } from './actions';

export const reduceLoadingStore = (store: LoadingStore, action?: QuestionnaireAction): AnyTaggedStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.LOAD_CHOSEN_QUESTIONS_SUCCESS:
            return new Store({
                ...store.lastValidStore,
                answers: chooseAnswersWithIdsIn(store.lastValidStore.answers, action.payload.chosenAnswers),
            });

        case constants.LOAD_CHOSEN_QUESTIONS_FAILURE:
            return new InvalidStore(store.lastValidStore, action.payload.message);

        default:
            return store;
    }
};

const chooseAnswersWithIdsIn = (answerMap: AnswersMap, idsToSetToChosen: ReadonlyArray<Id>): AnswersMap => {
    const setToChosenIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: R.contains(answer.id, idsToSetToChosen),
    });
    return R.map(setToChosenIfIdMatches, answerMap);
};
