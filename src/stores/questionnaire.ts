import { buildQuestionnaireFixture } from '../fixtures/buildFixtures';
import { Id, Answer, AnswersMap, Store } from '../fixtures/types/questionnaire';
import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import * as R from 'ramda';

export { Id, Question, Answer, QuestionsMap, AnswersMap, Store } from '../fixtures/types/questionnaire';

const buildDefaultStore = (): Store => (
    buildQuestionnaireFixture()
);

export type SelectAnswerAction = Readonly<ReturnType<typeof selectAnswer>>;
export type SetActiveQuestionAction = Readonly<ReturnType<typeof setActiveQuestion>>;

// tslint:disable-next-line:typedef
export const selectAnswer = (answerId: Id) => (
    helpers.makeAction(constants.SELECT_ANSWER, { answerId })
);

// tslint:disable-next-line:typedef
export const setActiveQuestion = (activeQuestion: Id) => (
    helpers.makeAction(constants.SET_ACTIVE_QUESTION, { activeQuestion })
);

export namespace Persistence {

    export type SaveSuccessAction = Readonly<ReturnType<typeof saveSuccess>>;
    export type SaveFailureAction = Readonly<ReturnType<typeof saveFailure>>;

    export type LoadRequestAction = Readonly<ReturnType<typeof loadRequest>>;
    export type LoadSuccessAction = Readonly<ReturnType<typeof loadSuccess>>;
    export type LoadFailureAction = Readonly<ReturnType<typeof loadFailure>>;

    // tslint:disable-next-line:typedef
    export const saveSuccess = () => (
        helpers.makeAction(constants.SAVE_ACTIVE_QUESTIONS_SUCCESS)
    );

    // tslint:disable-next-line:typedef
    export const saveFailure = (message: string) => (
        helpers.makeAction(constants.SAVE_ACTIVE_QUESTIONS_FAILURE, { message })
    );

    // tslint:disable-next-line:typedef
    export const loadRequest = () => (
        helpers.makeAction(constants.LOAD_ACTIVE_QUESTIONS_REQUEST)
    );

    // tslint:disable-next-line:typedef
    export const loadSuccess = (activeAnswers: ReadonlyArray<Id>) => (
        helpers.makeAction(constants.LOAD_ACTIVE_QUESTIONS_SUCCESS, { activeAnswers })
    );

    // tslint:disable-next-line:typedef
    export const loadFailure = (message: string) => (
        helpers.makeAction(constants.LOAD_ACTIVE_QUESTIONS_FAILURE, { message })
    );
}

type QuestionnaireAction = SelectAnswerAction | SetActiveQuestionAction | Persistence.LoadSuccessAction;

export const reducer = (store: Store = buildDefaultStore(), action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_ACTIVE_QUESTIONS_SUCCESS:
            return {
                ...store,
                answers: setAnswersWithIdsToActive(store.answers, action.payload.activeAnswers),
            };

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

const setAnswersWithIdsToActive = (answerMap: AnswersMap, idsToSetToActive: ReadonlyArray<Id>): AnswersMap => {
    const setToActiveIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isSelected: R.contains(answer.id, idsToSetToActive),
    });
    return R.map(setToActiveIfIdMatches, answerMap);
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
