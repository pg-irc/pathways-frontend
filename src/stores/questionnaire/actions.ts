import { Id } from '../../fixtures/types/questionnaire';
import { Id as TopicId } from '../../stores/topics';
import { UserDataPersistence } from '../user_data';
import { ClearErrorAction } from '../clear_error';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type ChooseAnswerAction = Readonly<ReturnType<typeof chooseAnswer>>;
export type SetActiveQuestionAction = Readonly<ReturnType<typeof setActiveQuestion>>;
export type ClearAllUserDataAction = Readonly<ReturnType<typeof clearAllUserData>>;
export type CloseQuestionnaireAction = Readonly<ReturnType<typeof closeQuestionnaire>>;

// tslint:disable-next-line:typedef
export const chooseAnswer = (answerId: Id) => (
    helpers.makeAction(constants.CHOOSE_ANSWER, { answerId })
);

// tslint:disable-next-line:typedef
export const setActiveQuestion = (activeQuestion: Id) => (
    helpers.makeAction(constants.SET_ACTIVE_QUESTION, { activeQuestion })
);

// tslint:disable-next-line:typedef
export const clearAllUserData = () => (
    helpers.makeAction(constants.CLEAR_ALL_USER_DATA)
);

// tslint:disable-next-line:typedef
export const closeQuestionnaire = (newlyRecommendedTopics: ReadonlyArray<TopicId>) => (
    helpers.makeAction(constants.CLOSE_QUESTIONNAIRE, { newlyRecommendedTopics })
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
    CloseQuestionnaireAction;
