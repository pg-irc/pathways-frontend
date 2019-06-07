import { Dispatch } from 'redux';
import { History, Location } from 'history';
import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
    toggleCompleted, RemoveFromSavedListAction, removeFromSavedList,
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
    const matchParams = getParametersFromPath(ownProps.location, Routes.TaskDetail);
    const topic = selectCurrentTopic(store, matchParams.topicId);
    const savedTasksIdList = pickSavedTopicIds(store);
    const taskIsBookmarked = R.contains(topic.id, savedTasksIdList);
    return {
        topic,
        taskIsBookmarked,
        savedTasksIdList,
        history: ownProps.history,
    };
};

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction | ToggleCompletedAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskDetailActions => ({
    toggleCompleted: (topicId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(topicId)),
    addToSavedList: (topicId: TaskId): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
