import * as constants from '../../application/constants';
import * as R from 'ramda';
import { Id, Answer, AnswersMap, ValidStore } from '../../fixtures/types/questionnaire';
import { LoadingStore, Store, InvalidStore } from './stores';
import { QuestionnaireAction } from './actions';

export const reduceLoadingStore = (store: LoadingStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.LOAD_CHOSEN_QUESTIONS_SUCCESS:
            return new ValidStore({
                ...store.lastValidState,
                answers: chooseAnswersWithIdsIn(store.lastValidState.answers, action.payload.chosenAnswers),
            });

        case constants.LOAD_CHOSEN_QUESTIONS_FAILURE:
            return new InvalidStore(store.lastValidState, action.payload.message);

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
