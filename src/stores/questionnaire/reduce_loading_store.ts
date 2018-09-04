import * as constants from '../../application/constants';
import * as R from 'ramda';
import { Id, Answer, AnswersMap, ValidQuestionnaireStore } from '../../fixtures/types/questionnaire';
import { LoadingQuestionnaireStore, QuestionnaireStore, InvalidQuestionnaireStore } from './stores';
import { QuestionnaireAction } from './actions';

export const reduceLoadingStore = (store: LoadingQuestionnaireStore, action?: QuestionnaireAction): QuestionnaireStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.LOAD_USER_DATA_SUCCESS:
            return new ValidQuestionnaireStore({
                ...store.lastValidState,
                answers: chooseAnswersWithIdsIn(store.lastValidState.answers, action.payload.chosenAnswers),
            });

        case constants.LOAD_USER_DATA_FAILURE:
            return new InvalidQuestionnaireStore(store.lastValidState, action.payload.message);

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
