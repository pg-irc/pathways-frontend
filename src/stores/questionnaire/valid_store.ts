import { AnswersMap, Store as ValidStore } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { Store, asValid, asInvalid, asLoading } from './tagged_stores';
import * as constants from '../../application/constants';

export const validStoreReducer = (store: ValidStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return asValid(store);
    }

    switch (action.type) {
        case constants.SAVE_CHOSEN_QUESTIONS_SUCCESS:
        case constants.SAVE_CHOSEN_QUESTIONS_FAILURE:
            return asValid(store);

        case constants.LOAD_CHOSEN_QUESTIONS_REQUEST:
            return asLoading({ lastValidState: store });

        case constants.LOAD_CHOSEN_QUESTIONS_FAILURE:
            return asInvalid(store);

        case constants.CHOOSE_ANSWER:
            return asValid(toggleIsChosenFlagForAnswer(store, action.payload.answerId));

        case constants.SET_ACTIVE_QUESTION:
            return asValid({
                ...store,
                activeQuestion: action.payload.activeQuestion,
            });

        default:
            return asValid(store);
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
