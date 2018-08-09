import { buildQuestionnaireFixture } from '../fixtures/buildFixtures';
import { Id, Answer, AnswersMap, Store } from '../fixtures/types/questionnaire';
import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import * as R from 'ramda';

export { Id, Question, Answer, QuestionsMap, AnswersMap, Store } from '../fixtures/types/questionnaire';

const buildDefaultStore = (): Store => (
    buildQuestionnaireFixture()
);

export type ChooseAnswerAction = Readonly<ReturnType<typeof chooseAnswer>>;
export type SetActiveQuestionAction = Readonly<ReturnType<typeof setActiveQuestion>>;

// tslint:disable-next-line:typedef
export const chooseAnswer = (answerId: Id) => (
    helpers.makeAction(constants.CHOOSE_ANSWER, { answerId })
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
        helpers.makeAction(constants.SAVE_CHOSEN_QUESTIONS_SUCCESS)
    );

    // tslint:disable-next-line:typedef
    export const saveFailure = (message: string) => (
        helpers.makeAction(constants.SAVE_CHOSEN_QUESTIONS_FAILURE, { message })
    );

    // tslint:disable-next-line:typedef
    export const loadRequest = () => (
        helpers.makeAction(constants.LOAD_CHOSEN_QUESTIONS_REQUEST)
    );

    // tslint:disable-next-line:typedef
    export const loadSuccess = (chosenAnswers: ReadonlyArray<Id>) => (
        helpers.makeAction(constants.LOAD_CHOSEN_QUESTIONS_SUCCESS, { chosenAnswers })
    );

    // tslint:disable-next-line:typedef
    export const loadFailure = (message: string) => (
        helpers.makeAction(constants.LOAD_CHOSEN_QUESTIONS_FAILURE, { message })
    );
}

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

const chooseAnswersWithIdsIn = (answerMap: AnswersMap, idsToSetToChosen: ReadonlyArray<Id>): AnswersMap => {
    const setToChosenIfIdMatches = (answer: Answer): Answer => ({
        ...answer,
        isChosen: R.contains(answer.id, idsToSetToChosen),
    });
    return R.map(setToChosenIfIdMatches, answerMap);
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
