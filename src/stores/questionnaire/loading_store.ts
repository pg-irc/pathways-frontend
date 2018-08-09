import * as constants from '../../application/constants';
import * as R from 'ramda';
import { Id, Answer, AnswersMap } from '../../fixtures/types/questionnaire';
import { asLoading, asValid, LoadingStore, Store } from './tagged_stores';
import { QuestionnaireAction } from './actions';

export const loadingStoreReducer = (store: LoadingStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return asLoading(store);
    }

    switch (action.type) {
        case constants.LOAD_CHOSEN_QUESTIONS_SUCCESS:
            return asValid({
                ...store.lastValidState,
                answers: chooseAnswersWithIdsIn(store.lastValidState.answers, action.payload.chosenAnswers),
            });

        default:
            return asLoading(store);
    }
};

const chooseAnswersWithIdsIn = (answerMap: AnswersMap, idsToSetToChosen: ReadonlyArray<Id>): AnswersMap => {
    const setToChosenIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: R.contains(answer.id, idsToSetToChosen),
    });
    return R.mapObjIndexed(setToChosenIfIdMatches, answerMap);
};
