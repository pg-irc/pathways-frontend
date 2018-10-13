import { ValidQuestionnaireStore, Answer, QuestionnaireRouteState } from '../../fixtures/types/questionnaire';
import { QuestionnaireAction } from './actions';
import { QuestionnaireStore, LoadingQuestionnaireStore } from './stores';
import { RouteChangedAction } from '../router_actions';
import { routePathWithoutParameter, Routes } from '../../application/routing';
import * as constants from '../../application/constants';
import * as R from 'ramda';

export const reduceValidStore = (store: ValidQuestionnaireStore, action?: QuestionnaireAction): QuestionnaireStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.ROUTE_CHANGED:
            return setRouteState(store, action);

        case constants.SET_ACTIVE_QUESTION:
            return new ValidQuestionnaireStore({
                ...store,
                activeQuestion: action.payload.activeQuestion,
            });

        case constants.CHOOSE_ANSWER:
            return toggleIsChosenFlagForAnswer(store, action.payload.answerId);

        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingQuestionnaireStore(store);

        default:
            return store;
    }
};

const setRouteState = (store: ValidQuestionnaireStore, action: RouteChangedAction): QuestionnaireStore => {

    const isNewRouteToQuestionnaire = action.payload.location.pathname === routePathWithoutParameter(Routes.Questionnaire);

    if (store.questionnaireRouteState === QuestionnaireRouteState.NotInQuestionnairePage && isNewRouteToQuestionnaire) {
        return new ValidQuestionnaireStore({
            ...store,
            oldAnswers: store.answers,
            questionnaireRouteState: QuestionnaireRouteState.InQuestionnairePage,
        });
    }

    if (store.questionnaireRouteState === QuestionnaireRouteState.InQuestionnairePage && !isNewRouteToQuestionnaire) {
        return new ValidQuestionnaireStore({
            ...store,
            questionnaireRouteState: QuestionnaireRouteState.ShowQuestionnairePopup,
        });
    }

    return store;
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
