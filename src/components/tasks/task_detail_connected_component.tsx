import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail_component';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
    toggleCompleted, RemoveFromSavedListAction, removeFromSavedList,
} from '../../stores/tasks';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { RouterProps } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';

const mapStateToProps = (store: Store, routerProps: RouterProps): TaskDetailProps => {
    const task: Task = selectCurrentTask(store, routerProps);
    return {
        task: task,
        savedTasksIdList: pickSavedTaskIds(store),
        history: routerProps.history,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskDetailActions => ({
    addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
    toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
