import { Id } from '../../fixtures/types/questionnaire';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { PersistedUserData } from '../../selectors/user_data/persisted_user_data';

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

// TODO find a better name for this namespace so it doesn't look like a data type
// TODO move this out of this questionnaire-related file
export namespace UserData {

    export type SaveSuccessAction = Readonly<ReturnType<typeof saveSuccess>>;
    export type SaveFailureAction = Readonly<ReturnType<typeof saveFailure>>;

    export type LoadRequestAction = Readonly<ReturnType<typeof loadRequest>>;
    export type LoadSuccessAction = Readonly<ReturnType<typeof loadSuccess>>;
    export type LoadFailureAction = Readonly<ReturnType<typeof loadFailure>>;

    // tslint:disable-next-line:typedef
    export const saveSuccess = () => (
        helpers.makeAction(constants.SAVE_USER_DATA_SUCCESS)
    );

    // tslint:disable-next-line:typedef
    export const saveFailure = (message: string) => (
        helpers.makeAction(constants.SAVE_USER_DATA_FAILURE, { message })
    );

    // tslint:disable-next-line:typedef
    export const loadRequest = () => (
        helpers.makeAction(constants.LOAD_USER_DATA_REQUEST)
    );

    // tslint:disable-next-line:typedef
    export const loadSuccess = (userData: PersistedUserData) => (
        helpers.makeAction(constants.LOAD_USER_DATA_SUCCESS, userData)
    );

    // tslint:disable-next-line:typedef
    export const loadFailure = (message: string) => (
        helpers.makeAction(constants.LOAD_USER_DATA_FAILURE, { message })
    );
}

// tslint:disable-next-line:typedef
export const clearErrorState = () => (
    helpers.makeAction(constants.CLEAR_ERROR_STATE)
);

export type ClearErrorAction = Readonly<ReturnType<typeof clearErrorState>>;

export type QuestionnaireAction = ChooseAnswerAction | SetActiveQuestionAction
    | UserData.SaveSuccessAction | UserData.SaveFailureAction
    | UserData.LoadRequestAction | UserData.LoadSuccessAction | UserData.LoadFailureAction
    | ClearErrorAction;
