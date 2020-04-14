// tslint:disable:no-expression-statement no-any

import * as constants from '../../application/constants';
import { AnalyticsAsync, AnalyticsLinkPressedAction, SearchExecutedAction } from '../../stores/analytics';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { RouteChangedAction } from '../../stores/router_actions';
import { selectDisableAnalytics } from '../../selectors/user_profile/select_disable_analytics';
import { ForkEffect, takeLatest, call, CallEffect, PutEffect, put, select, SelectEffect } from 'redux-saga/effects';
import { BookmarkTopicAction, ExpandDetailAction, CollapseDetailAction } from '../../stores/topics';
import * as events from './events';
import { BookmarkServiceAction, OpenServiceAction } from '../../stores/services/actions';

export type WatchedAction =
    RouteChangedAction |
    ChooseAnswerAction |
    BookmarkTopicAction |
    BookmarkServiceAction |
    OpenServiceAction |
    ExpandDetailAction |
    CollapseDetailAction |
    AnalyticsLinkPressedAction |
    SearchExecutedAction;

export function* watchAnalytics(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.ROUTE_CHANGED,
            constants.CHOOSE_ANSWER,
            constants.EXPAND_DETAIL,
            constants.COLLAPSE_DETAIL,
            constants.BOOKMARK_TOPIC,
            constants.BOOKMARK_SERVICE,
            constants.OPEN_SERVICE,
            constants.ANALYTICS_LINK_PRESSED,
            constants.SEARCH_EXECUTED,
        ],
        sendAnalyticsData);
}

type SuccessOrFail = AnalyticsAsync.SuccessAction | AnalyticsAsync.FailureAction;

type AnalyticsActions = IterableIterator<CallEffect | SelectEffect | PutEffect<SuccessOrFail>>;

function* sendAnalyticsData(action: WatchedAction): AnalyticsActions {
    try {
        const analyticsIsDisabled = yield select(selectDisableAnalytics);
        if (analyticsIsDisabled) {
            return;
        }
        yield call(sendAnalyticsDataAsync, action);
        yield put(AnalyticsAsync.success());
    } catch (error) {
        console.error(`Failed to send analytics data (${error.message})`);
        yield put(AnalyticsAsync.failure(error.message));
    }
}

async function sendAnalyticsDataAsync(action: WatchedAction): Promise<void> {
    switch (action.type) {
        case constants.ROUTE_CHANGED:
            events.sendScreenHit(action);
            break;
        case constants.CHOOSE_ANSWER:
            events.sendAnswerChosenEvent(action.payload.answerId);
            break;
        case constants.BOOKMARK_TOPIC:
            events.sendBookmarkTopicEvent(action.payload.topicId);
            break;
        case constants.BOOKMARK_SERVICE:
            events.sendBookmarkServiceEvent(action.payload.service);
            break;
        case constants.OPEN_SERVICE:
            events.sendOpenService(action.payload.service);
            break;
        case constants.EXPAND_DETAIL:
            events.sendExpandDetail(action.payload.contentId);
            break;
        case constants.COLLAPSE_DETAIL:
            events.sendCollapseDetail(action.payload.contentId);
            break;
        case constants.ANALYTICS_LINK_PRESSED:
            events.sendLinkPressedEvent(action.payload.currentPath, action.payload.linkContext, action.payload.linkType, action.payload.linkValue);
            break;
        case constants.SEARCH_EXECUTED:
            events.sendSearchExecutedEvent(action.payload.searchTerm, action.payload.searchLocation);
            break;
        default:
            break;
    }
}
