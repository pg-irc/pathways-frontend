import { Dispatch } from 'redux';
import { History, Location } from 'history';
import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, BookmarkTopicAction, bookmarkTopic, UnbookmarkTopicAction, unbookmarkTopic,
    ExpandDetailAction, expandDetail,
    CollapseDetailAction, collapseDeail,
} from '../../stores/topics';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { Routes, getParametersFromPath } from '../../application/routing';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';

type OwnProps = {
    readonly history: History;
    readonly location?: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): TaskDetailProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.TopicDetail);
    const topic = selectCurrentTopic(store, matchParams.topicId);
    const savedTasksIdList = pickBookmarkedTopicIds(store);
    const taskIsBookmarked = R.contains(topic.id, savedTasksIdList);
    return {
        topic,
        taskIsBookmarked,
        savedTasksIdList,
        history: ownProps.history,
        currentPath: ownProps.location.pathname,
    };
};

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction | ExpandDetailAction | CollapseDetailAction | AnalyticsLinkPressedAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskDetailActions => ({
    bookmarkTopic: (topicId: TaskId): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: TaskId): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    onExpand: (contentId: string): ExpandDetailAction => dispatch(expandDetail(contentId)),
    onCollapse: (contentId: string): CollapseDetailAction => dispatch(collapseDeail(contentId)),
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
