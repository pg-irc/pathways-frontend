import { Id } from '../../fixtures/types/questionnaire';
import { UserData } from '../user_data';
import { ClearErrorAction } from '../clear_error';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

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

export type QuestionnaireAction = ChooseAnswerAction | SetActiveQuestionAction
    | UserData.SaveSuccessAction | UserData.SaveFailureAction
    | UserData.LoadRequestAction | UserData.LoadSuccessAction | UserData.LoadFailureAction
    | ClearErrorAction;
