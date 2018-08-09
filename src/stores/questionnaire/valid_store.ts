import { Id, Answer, AnswersMap, Store } from '../../fixtures/types/questionnaire';
import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { ChooseAnswerAction, SetActiveQuestionAction, Persistence } from './actions';
import * as constants from '../../application/constants';
import * as R from 'ramda';

type QuestionnaireAction = ChooseAnswerAction | SetActiveQuestionAction | Persistence.LoadSuccessAction;

export const reducer = (store: Store = buildDefaultStore(), action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_CHOSEN_QUESTIONS_SUCCESS:
            return {
                ...store,
                answers: chooseAnswersWithIdsIn(store.answers, action.payload.chosenAnswers),
            };

        case constants.CHOOSE_ANSWER:
            return toggleIsChosenFlagForAnswer(store, action.payload.answerId);

        case constants.SET_ACTIVE_QUESTION:
            return {
                ...store,
                activeQuestion: action.payload.activeQuestion,
            };

        default:
            return store;
    }
};

const buildDefaultStore = (): Store => (
    buildQuestionnaireFixture()
);

const chooseAnswersWithIdsIn = (answerMap: AnswersMap, idsToSetToChosen: ReadonlyArray<Id>): AnswersMap => {
    const setToChosenIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: R.contains(answer.id, idsToSetToChosen),
    });
    return R.mapObjIndexed(setToChosenIfIdMatches, answerMap);
};

const toggleIsChosenFlagForAnswer = (store: Store, answerId: string): Store => (
    canChooseMultiple(store, answerId) ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlagForSingleAnswer(store, answerId)
);

const canChooseMultiple = (store: Store, answerId: string): boolean => {
    const answer = store.answers[answerId];
    const question = store.questions[answer.questionId];
    return question.acceptMultipleAnswers;
};

const toggleIsChosenFlag = (store: Store, answerId: string): Store => {
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

const toggleIsChosenFlagForSingleAnswer = (store: Store, answerId: string): Store => {
    const answer = store.answers[answerId];
    return answer.isChosen ?
        toggleIsChosenFlag(store, answerId) :
        toggleIsChosenFlag(setAllAnswersForQuestionToNonChosen(store, answer.questionId), answerId);
};

const setAllAnswersForQuestionToNonChosen = (store: Store, questionId: string): Store => {
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
