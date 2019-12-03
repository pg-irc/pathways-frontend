import { Dispatch } from 'redux';
import { History, Location } from 'history';
import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, AddTopicToSavedListAction, addTopicToSavedList,
    RemoveTopicFromSavedListAction, removeTopicFromSavedList,
    ExpandDetailAction, expandDetail,
    CollapseDetailAction, collapseDeail,
} from '../../stores/topics';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';
import { Routes, getParametersFromPath } from '../../application/routing';

type OwnProps = {
    readonly history: History;
    readonly location?: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): TaskDetailProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.TopicDetail);
    const topic = selectCurrentTopic(store, matchParams.topicId);
    const savedTasksIdList = pickSavedTopicIds(store);
    const taskIsBookmarked = R.contains(topic.id, savedTasksIdList);
    return {
        topic,
        taskIsBookmarked,
        savedTasksIdList,
        history: ownProps.history,
        currentPath: ownProps.location.pathname,
    };
};

type DispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction | ExpandDetailAction | CollapseDetailAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskDetailActions => ({
    addTopicToSavedList: (topicId: TaskId): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeTopicFromSavedList: (topicId: TaskId): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
    onExpand: (contentId: string): ExpandDetailAction => dispatch(expandDetail(contentId)),
    onCollapse: (contentId: string): CollapseDetailAction => dispatch(collapseDeail(contentId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
