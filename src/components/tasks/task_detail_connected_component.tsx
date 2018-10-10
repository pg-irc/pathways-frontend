import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent, TaskServiceUpdater } from './task_detail';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
    toggleCompleted, RemoveFromSavedListAction, removeFromSavedList,
} from '../../stores/tasks';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { RouterProps } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';
import { selectTaskServices } from '../../selectors/services/select_task_services';

function mapStateToProps(store: Store, ownProps: RouterProps): TaskDetailProps {
    const task: Task = selectCurrentTask(store, ownProps);
    return {
        task: task,
        savedTasksIdList: pickSavedTaskIds(store),
        taskServices: selectTaskServices(task.id, store),
    };
}

function mapDispatchToProps(dispatch: Dispatch<Store>): TaskDetailActions {
    return {
        addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
        removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
        toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
        requestUpdateTaskServices: (task: Task): UpdateTaskServicesAsync.Request => {
            return dispatch(updateTaskServicesAsync.request(task.id, task.serviceQuery));
        },
    };
}

type ComponentProps = TaskDetailProps & TaskDetailActions & TaskServiceUpdater & RouterProps;

function mergeProps(stateProps: TaskDetailProps, dispatchProps: TaskDetailActions, routerProps: RouterProps): ComponentProps {
    return {
        ...stateProps, ...dispatchProps, ...routerProps,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(stateProps.task);
        },
    };
}

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
