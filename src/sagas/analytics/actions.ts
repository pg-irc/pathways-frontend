import * as constants from '../../application/constants';
import * as helpers from '../../stores/helpers/make_action';

export namespace AnalyticsAsync {

    // tslint:disable-next-line:typedef
    export const request = () => (
        helpers.makeAction(constants.ANALYTICS_ASYNC_REQUEST)
    );

    // tslint:disable-next-line:typedef
    export const success = () => (
        helpers.makeAction(constants.ANALYTICS_ASYNC_SUCCESS)
    );

    // tslint:disable-next-line:typedef
    export const failure = (error: string) => (
        helpers.makeAction(constants.ANALYTICS_ASYNC_FAILURE, { error })
    );

    export type RequestAction = Readonly<ReturnType<typeof request>>;
    export type SuccessAction = Readonly<ReturnType<typeof success>>;
    export type FailureAction = Readonly<ReturnType<typeof failure>>;
}
