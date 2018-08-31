import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { Id as QuestionId } from './questionnaire';
import { Id as TaskId } from './tasks';

export interface PersistedUserData {
    readonly chosenAnswers: ReadonlyArray<QuestionId>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}

export namespace UserDataPersistence {

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
