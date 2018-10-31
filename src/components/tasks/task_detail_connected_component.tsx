import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent, TaskServiceUpdater } from './task_detail_component';
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

const mapStateToProps = (store: Store, route: RouterProps): TaskDetailProps => {
    const task: Task = selectCurrentTask(store, route);
    return {
        task: task,
        savedTasksIdList: pickSavedTaskIds(store),
        taskServices: selectTaskServices(task.id, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskDetailActions => ({
    addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
    toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
    requestUpdateOfServicesForTask: (task: Task): UpdateTaskServicesAsync.Request => (
        dispatch(updateTaskServicesAsync.request(task.id, task.serviceQuery))
    ),
});

type ComponentProps = TaskDetailProps & TaskDetailActions & TaskServiceUpdater;

const mergeProps = (props: TaskDetailProps, actions: TaskDetailActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
        return actions.requestUpdateOfServicesForTask(props.task);
    },
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
