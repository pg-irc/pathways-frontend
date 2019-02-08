import { ValidQuestionnaireStore, Answer } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { QuestionnaireStore, LoadingQuestionnaireStore } from './stores';
import * as constants from '../../application/constants';
import * as R from 'ramda';
import { buildDefaultStore } from '.';

export const reduceValidStore = (store: ValidQuestionnaireStore, action?: QuestionnaireAction): QuestionnaireStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {

        case constants.UPDATE_OLD_ANSWERS_FROM_STORE_ANSWERS:
            return new ValidQuestionnaireStore({
                ...store,
                oldAnswers: store.answers,
            });

        case constants.SET_ACTIVE_QUESTION:
            return new ValidQuestionnaireStore({
                ...store,
                activeQuestion: action.payload.activeQuestion,
            });

        case constants.CHOOSE_ANSWER:
            return toggleIsChosenFlagForAnswer(store, action.payload.answerId);

        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingQuestionnaireStore(store);

        case constants.CLEAR_ALL_USER_DATA:
            return new ValidQuestionnaireStore(buildDefaultStore());

        default:
            return store;
    }
};

const toggleIsChosenFlagForAnswer = (store: ValidQuestionnaireStore, answerId: string): ValidQuestionnaireStore => (
    canChooseMultiple(store, answerId) ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlagForSingleAnswer(store, answerId)
);

const canChooseMultiple = (store: ValidQuestionnaireStore, answerId: string): boolean => {
    const answer = store.answers[answerId];
    const question = store.questions[answer.questionId];
    return question.acceptMultipleAnswers;
};

const toggleIsChosenFlag = (store: ValidQuestionnaireStore, answerId: string): ValidQuestionnaireStore => {
    const answer = store.answers[answerId];
    return new ValidQuestionnaireStore({
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

const toggleIsChosenFlagForSingleAnswer = (store: ValidQuestionnaireStore, answerId: string): ValidQuestionnaireStore => {
    const answer = store.answers[answerId];
    return answer.isChosen ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlag(unchooseAllAnswersForQuestion(store, answer.questionId), answerId);
};

const unchooseAllAnswersForQuestion = (store: ValidQuestionnaireStore, questionId: string): ValidQuestionnaireStore => {
    const unchooseIfQuestionMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: answer.questionId === questionId ? false : answer.isChosen,
    });
    return new ValidQuestionnaireStore({
        ...store,
        answers: R.map(unchooseIfQuestionMatches, store.answers),
    });
};
