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
import { TaskServices } from '../../selectors/services/task_services';
import { selectTaskServices } from '../../selectors/services/select_task_services';

interface StateProps extends TaskDetailProps {
    readonly taskServices: TaskServices;
}

function mapStateToProps(store: Store, ownProps: RouterProps): StateProps {
    const task: Task = selectCurrentTask(store, ownProps);
    return {
        task: task,
        savedTasksIdList: pickSavedTaskIds(store),
        taskServices: selectTaskServices(task.id, store),
    };
}

interface DispatchProps extends TaskDetailActions {
    readonly requestUpdateTaskServices: (task: Task) => UpdateTaskServicesAsync.Request;
}

function mapDispatchToProps(dispatch: Dispatch<Store>): DispatchProps {
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

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps, routerProps: RouterProps): ComponentProps {
    return {
        ...stateProps, ...dispatchProps, ...routerProps,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(stateProps.task);
        },
    };
}

export const TaskDetailConnectedComponent =
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
