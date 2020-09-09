import { Dispatch } from 'redux';
import { History, Location } from 'history';
import { Store } from '../../stores';
import { TopicDetailsProps, TopicDetailActions, TopicDetailComponent } from './topic_detail_component';
import {
    Id as TaskId, BookmarkTopicAction, bookmarkTopic, UnbookmarkTopicAction, unbookmarkTopic,
    ExpandDetailAction, expandDetail,
    CollapseDetailAction, collapseDeail,
} from '../../stores/topics';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { Routes, getParametersFromPath } from '../../application/routing';
import { AnalyticsLinkPressedAction, analyticsLinkPressed, AnalyticsLinkProps } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu, saveTopicDetailScrollOffset, SaveTopicDetailScrollOffsetAction } from '../../stores/user_experience/actions';
import { selectShowLinkAlerts } from '../../selectors/user_profile/select_show_link_alerts';
import { HideLinkAlertsAction, hideLinkAlerts } from '../../stores/user_profile';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { BuildServicesRequestAction, buildServicesRequest } from '../../stores/services/actions';
import { UserLocation } from '../../validation/latlong/types';
import { Topic } from '../../selectors/topics/types';
import { isTopicBookmarked } from '../../selectors/topics/is_topic_bookmarked';
import { selectCustomLatLong } from '../../selectors/user_profile/select_custom_latlong';
import { SaveTaskListScrollOffsetActions } from './task_list_component';
import { selectTopicDetailScrollOffset } from '../../selectors/user_experience/selectTopicDetailScrollOffset';

type OwnProps = {
    readonly history: History;
    readonly location?: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): TopicDetailsProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.TopicDetail);
    return {
        topic: selectCurrentTopic(store, matchParams.topicId),
        topicIsBookmarked: isTopicBookmarked(store, matchParams.topicId),
        bookmarkedTopicsIdList: pickBookmarkedTopicIds(store),
        showLinkAlert: selectShowLinkAlerts(store),
        history: ownProps.history,
        location: ownProps.location,
        manualUserLocation: selectManualUserLocation(store),
        customLatLong: selectCustomLatLong(store),
        scrollOffset: selectTopicDetailScrollOffset(store),
    };
};

type Actions =
    BookmarkTopicAction |
    UnbookmarkTopicAction |
    ExpandDetailAction |
    CollapseDetailAction |
    AnalyticsLinkPressedAction |
    OpenHeaderMenuAction |
    HideLinkAlertsAction |
    BuildServicesRequestAction |
    SaveTopicDetailScrollOffsetAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): TopicDetailActions => ({
    bookmarkTopic: (topicId: TaskId): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: TaskId): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    onExpand: (contentId: string): ExpandDetailAction => dispatch(expandDetail(contentId)),
    onCollapse: (contentId: string): CollapseDetailAction => dispatch(collapseDeail(contentId)),
    analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(analyticsLinkProps)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    hideLinkAlert: (): HideLinkAlertsAction => dispatch(hideLinkAlerts()),
    dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation): BuildServicesRequestAction =>
        dispatch(buildServicesRequest(topic.id, manualUserLocation)),
    saveScrollOffset: (offset: number): SaveTaskListScrollOffsetActions => dispatch(saveTopicDetailScrollOffset(offset)),
});

export const TopicDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TopicDetailComponent);
