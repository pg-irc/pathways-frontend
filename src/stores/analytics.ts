// tslint:disable:typedef

import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export namespace AnalyticsAsync {

    export const request = () => (
        helpers.makeAction(constants.AnalyticsAsync.REQUEST)
    );

    export const success = () => (
        helpers.makeAction(constants.AnalyticsAsync.SUCCESS)
    );

    export const failure = (error: string) => (
        helpers.makeAction(constants.AnalyticsAsync.FAILURE, { error })
    );

    export type RequestAction = Readonly<ReturnType<typeof request>>;
    export type SuccessAction = Readonly<ReturnType<typeof success>>;
    export type FailureAction = Readonly<ReturnType<typeof failure>>;
}

export type AnalyticsLinkPressedAction = Readonly<ReturnType<typeof analyticsLinkPressed>>;
export type SearchExecutedAction = Readonly<ReturnType<typeof searchExecuted>>;

export interface AnalyticsLinkProps {
    currentPath: string;
    linkContext: string;
    linkType: string;
    linkValue: string;
}

export const analyticsLinkPressed = (props: AnalyticsLinkProps) => (
    helpers.makeAction(constants.ANALYTICS_LINK_PRESSED, { props })
);

export const searchExecuted = (searchTerm: string, searchLocation: string) => (
    helpers.makeAction(constants.SEARCH_EXECUTED, { searchTerm, searchLocation })
);
