import { AnswersMap, ValidStore as ValidStore } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { Store, LoadingStore } from './tagged_stores';
import * as constants from '../../application/constants';

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
            return new ValidStore(toggleIsChosenFlagForAnswer(store, action.payload.answerId));

        case constants.LOAD_CHOSEN_QUESTIONS_REQUEST:
            return new LoadingStore(store, 0);

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
    return {
        ...store,
        answers: {
            ...store.answers,
            [answerId]: {
                ...answer,
                isChosen: !answer.isChosen,
            },
        },
    };
};

const toggleIsChosenFlagForSingleAnswer = (store: ValidStore, answerId: string): ValidStore => {
    const answer = store.answers[answerId];
    return answer.isChosen ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlag(setAllAnswersForQuestionToNonChosen(store, answer.questionId), answerId);
};

const setAllAnswersForQuestionToNonChosen = (store: ValidStore, questionId: string): ValidStore => {
    const setToNonChosenIfQuestionIdMatches = (accumulator: AnswersMap, answerId: string): AnswersMap => {
        const answer = store.answers[answerId];
        if (answer.questionId === questionId) {
            return { ...accumulator, [answerId]: { ...answer, isChosen: false } };
        }
        return { ...accumulator, [answerId]: answer };
    };
    return {
        ...store,
        answers: Object.keys(store.answers).reduce(setToNonChosenIfQuestionIdMatches, {}),
    };
};
