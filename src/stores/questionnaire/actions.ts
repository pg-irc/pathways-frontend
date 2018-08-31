import { Id } from '../../fixtures/types/questionnaire';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { UserData } from '../user_data';

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

// TODO move
// tslint:disable-next-line:typedef
export const clearErrorState = () => (
    helpers.makeAction(constants.CLEAR_ERROR_STATE)
);

// TODO move
export type ClearErrorAction = Readonly<ReturnType<typeof clearErrorState>>;

export type QuestionnaireAction = ChooseAnswerAction | SetActiveQuestionAction
    | UserData.SaveSuccessAction | UserData.SaveFailureAction
    | UserData.LoadRequestAction | UserData.LoadSuccessAction | UserData.LoadFailureAction
    | ClearErrorAction;
