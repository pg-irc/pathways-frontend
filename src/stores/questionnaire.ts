import { buildQuestionnaireFixture } from '../fixtures/buildFixtures';
import { Id, AnswersMap, Store } from '../fixtures/types/questionnaire';
import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export { Id, Question, Answer, QuestionsMap, AnswersMap, Store } from '../fixtures/types/questionnaire';

const buildDefaultStore = (): Store => (
    buildQuestionnaireFixture()
);

export type SelectAnswerAction = Readonly<ReturnType<typeof selectAnswer>>;
export type SetActiveQuestionAction = Readonly<ReturnType<typeof setActiveQuestion>>;
type QuestionnaireAction = SelectAnswerAction | SetActiveQuestionAction;

// tslint:disable-next-line:typedef
export const selectAnswer = (answerId: Id) => (
    helpers.makeAction(constants.SELECT_ANSWER, { answerId })
);

// tslint:disable-next-line:typedef
export const setActiveQuestion = (activeQuestion: Id) => (
    helpers.makeAction(constants.SET_ACTIVE_QUESTION, { activeQuestion })
);

export namespace Persistence {
    export type Success = Readonly<ReturnType<typeof success>>;

    // tslint:disable-next-line:typedef
    export const success = (activeQuestions: ReadonlyArray<Id>) => {
        return helpers.makeAction(constants.LOAD_ACTIVE_QUESTIONS_SUCCESS, { activeQuestions });
    };
}

export const reducer = (store: Store = buildDefaultStore(), action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SELECT_ANSWER:
            return toggleSelectionForAnswer(store, action.payload.answerId);
        case constants.SET_ACTIVE_QUESTION:
            return {
                ...store,
                activeQuestion: action.payload.activeQuestion,
            };
        default:
            return store;
    }
};

const toggleSelectionForAnswer = (store: Store, answerId: string): Store => (
    canSelectMultiple(store, answerId) ?
        toggleSelection(store, answerId) :
        toggleSelectionForSingleAnswer(store, answerId)
);

const canSelectMultiple = (store: Store, answerId: string): boolean => {
    const answer = store.answers[answerId];
    const question = store.questions[answer.questionId];
    return question.acceptMultipleAnswers;
};

const toggleSelection = (store: Store, answerId: string): Store => {
    const answer = store.answers[answerId];
    return {
        ...store,
        answers: {
            ...store.answers,
            [answerId]: {
                ...answer,
                isSelected: !answer.isSelected,
            },
        },
    };
};

const toggleSelectionForSingleAnswer = (store: Store, answerId: string): Store => {
    const answer = store.answers[answerId];
    return answer.isSelected ?
        toggleSelection(store, answerId) :
        toggleSelection(deselectAllAnswersForQuestion(store, answer.questionId), answerId);
};

const deselectAllAnswersForQuestion = (store: Store, questionId: string): Store => {
    const deselectIfQuestionIdMatches = (accumulator: AnswersMap, answerId: string): AnswersMap => {
        const answer = store.answers[answerId];
        if (answer.questionId === questionId) {
            return { ...accumulator, [answerId]: { ...answer, isSelected: false } };
        }
        return { ...accumulator, [answerId]: answer };
    };
    return {
        ...store,
        answers: Object.keys(store.answers).reduce(deselectIfQuestionIdMatches, {}),
    };
};
