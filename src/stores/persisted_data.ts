import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { Id as AnswerId } from './questionnaire';
import { Id as TopicId } from './topics';
import { ServiceMap } from '../validation/services/types';

export interface PersistedData {
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly bookmarkedTopics: ReadonlyArray<TopicId>;
    readonly showOnboarding: boolean;
    readonly bookmarkedServices: ServiceMap;
    readonly disableAnalytics: boolean;
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly showPartialLocalizationMessage: boolean;
}

export namespace DataPersistence {

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
    export const loadSuccess = (userData: PersistedData) => (
        helpers.makeAction(constants.LOAD_USER_DATA_SUCCESS, userData)
    );

    // tslint:disable-next-line:typedef
    export const loadFailure = (message: string) => (
        helpers.makeAction(constants.LOAD_USER_DATA_FAILURE, { message })
    );
}
