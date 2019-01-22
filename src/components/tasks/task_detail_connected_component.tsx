import { Dispatch } from 'redux';
import { History, Location } from 'history';
import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
    toggleCompleted, RemoveFromSavedListAction, removeFromSavedList,
} from '../../stores/tasks';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { Task } from '../../selectors/tasks/task';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';
import { Routes, getParametersFromPath } from '../../application/routing';

type OwnProps = {
    readonly history: History;
    readonly location?: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): TaskDetailProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.TaskDetail);
    const task: Task = selectCurrentTask(store, matchParams.taskId);
    const savedTasksIdList = pickSavedTaskIds(store);
    const taskIsBookmarked = R.contains(task.id, savedTasksIdList);
    return {
        task,
        taskIsBookmarked,
        savedTasksIdList,
        history: ownProps.history,
    };
};

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction | ToggleCompletedAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskDetailActions => ({
    toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
    addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
