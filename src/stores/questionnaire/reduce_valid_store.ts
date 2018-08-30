import { ValidStore, Answer } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { Store, LoadingStore } from './stores';
import * as constants from '../../application/constants';
import * as R from 'ramda';

export const reduceValidStore = (store: ValidStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.SET_ACTIVE_QUESTION:
            return new ValidStore({
                ...store,
                activeQuestion: action.payload.activeQuestion,
            });

        case constants.CHOOSE_ANSWER:
            return toggleIsChosenFlagForAnswer(store, action.payload.answerId);

        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingStore(store);

        default:
            return store;
    }
};

const toggleIsChosenFlagForAnswer = (store: ValidStore, answerId: string): ValidStore => (
    canChooseMultiple(store, answerId) ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlagForSingleAnswer(store, answerId)
);

const canChooseMultiple = (store: ValidStore, answerId: string): boolean => {
    const answer = store.answers[answerId];
    const question = store.questions[answer.questionId];
    return question.acceptMultipleAnswers;
};

const toggleIsChosenFlag = (store: ValidStore, answerId: string): ValidStore => {
    const answer = store.answers[answerId];
    return new ValidStore({
        ...store,
        answers: {
            ...store.answers,
            [answerId]: {
                ...answer,
                isChosen: !answer.isChosen,
            },
        },
    });
};

const toggleIsChosenFlagForSingleAnswer = (store: ValidStore, answerId: string): ValidStore => {
    const answer = store.answers[answerId];
    return answer.isChosen ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlag(unchooseAllAnswersForQuestion(store, answer.questionId), answerId);
};

const unchooseAllAnswersForQuestion = (store: ValidStore, questionId: string): ValidStore => {
    const unchooseIfQuestionMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: answer.questionId === questionId ? false : answer.isChosen,
    });
    return new ValidStore({
        ...store,
        answers: R.map(unchooseIfQuestionMatches, store.answers),
    });
};
