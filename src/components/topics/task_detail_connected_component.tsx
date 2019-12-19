import { Dispatch } from 'redux';
import { History, Location } from 'history';
import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList,
    RemoveFromSavedListAction, removeFromSavedList,
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

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction | ExpandDetailAction | CollapseDetailAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskDetailActions => ({
    addToSavedList: (topicId: TaskId): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
    onExpand: (contentId: string): ExpandDetailAction => dispatch(expandDetail(contentId)),
    onCollapse: (contentId: string): CollapseDetailAction => dispatch(collapseDeail(contentId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
