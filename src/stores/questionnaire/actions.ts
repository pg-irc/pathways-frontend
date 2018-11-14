import { Id } from '../../fixtures/types/questionnaire';
import { UserDataPersistence } from '../user_data';
import { ClearErrorAction } from '../clear_error';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { RouteChangedAction } from '../router_actions';
import { SaveTheseTasksToMyPlanAction } from '../tasks/actions';

export type ChooseAnswerAction = Readonly<ReturnType<typeof chooseAnswer>>;
export type SetActiveQuestionAction = Readonly<ReturnType<typeof setActiveQuestion>>;
export type DismissNewlyAddedTasksPopupAction = Readonly<ReturnType<typeof dismissNewlyAddedTasksPopup>>;
export type ClearAllUserDataAction = Readonly<ReturnType<typeof clearAllUserData>>;

// tslint:disable-next-line:typedef
export const chooseAnswer = (answerId: Id) => (
    helpers.makeAction(constants.CHOOSE_ANSWER, { answerId })
);

// tslint:disable-next-line:typedef
export const setActiveQuestion = (activeQuestion: Id) => (
    helpers.makeAction(constants.SET_ACTIVE_QUESTION, { activeQuestion })
);

// tslint:disable-next-line:typedef
export const dismissNewlyAddedTasksPopup = () => (
    helpers.makeAction(constants.DISMISS_NEWLY_ADDED_POPUP)
);

// tslint:disable-next-line:typedef
export const clearAllUserData = () => (
    helpers.makeAction(constants.CLEAR_ALL_USER_DATA)
);

export type QuestionnaireAction =
    ChooseAnswerAction |
    SetActiveQuestionAction |
    UserDataPersistence.SaveSuccessAction |
    UserDataPersistence.SaveFailureAction |
    UserDataPersistence.LoadRequestAction |
    UserDataPersistence.LoadSuccessAction |
    UserDataPersistence.LoadFailureAction |
    ClearErrorAction |
    ClearAllUserDataAction |
    RouteChangedAction |
    DismissNewlyAddedTasksPopupAction |
    SaveTheseTasksToMyPlanAction
    ;
