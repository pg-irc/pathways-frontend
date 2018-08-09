import { Id, Answer, AnswersMap, Store as ValidStore } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { Store, asValid, asInvalid } from './tagged_stores';
import * as constants from '../../application/constants';
import * as R from 'ramda';

export const validStoreReducer = (store: ValidStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return asValid(store);
    }

    switch (action.type) {
        case constants.SAVE_CHOSEN_QUESTIONS_SUCCESS:
        case constants.LOAD_CHOSEN_QUESTIONS_REQUEST:
        case constants.SAVE_CHOSEN_QUESTIONS_FAILURE:
            return asValid(store);

        case constants.LOAD_CHOSEN_QUESTIONS_FAILURE:
            return asInvalid(store);

        case constants.LOAD_CHOSEN_QUESTIONS_SUCCESS:
            return asValid({
                ...store,
                answers: chooseAnswersWithIdsIn(store.answers, action.payload.chosenAnswers),
            });

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

const chooseAnswersWithIdsIn = (answerMap: AnswersMap, idsToSetToChosen: ReadonlyArray<Id>): AnswersMap => {
    const setToChosenIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: R.contains(answer.id, idsToSetToChosen),
    });
    return R.mapObjIndexed(setToChosenIfIdMatches, answerMap);
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
