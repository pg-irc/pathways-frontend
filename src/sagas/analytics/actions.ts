// tslint:disable:typedef

import { AnalyticsAsync as constants } from '../../application/constants';
import * as helpers from '../../stores/helpers/make_action';

export namespace AnalyticsAsync {

    export const request = () => (
        helpers.makeAction(constants.REQUEST)
    );

    export const success = () => (
        helpers.makeAction(constants.SUCCESS)
    );

    export const failure = (error: string) => (
        helpers.makeAction(constants.FAILURE, { error })
    );

    export type RequestAction = Readonly<ReturnType<typeof request>>;
    export type SuccessAction = Readonly<ReturnType<typeof success>>;
    export type FailureAction = Readonly<ReturnType<typeof failure>>;
}
