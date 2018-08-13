import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent, TaskServiceUpdater } from './task_detail';
import { TaskServices, selectTaskServices, createRelatedServicesQueryFromTask } from '../../selectors/services';
import {
    Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
    toggleCompleted, RemoveFromSavedListAction, removeFromSavedList,
} from '../../stores/tasks';
import { connect } from 'react-redux';
import { selectTask, selectSavedTasksIdList } from '../../selectors/tasks';
import { RouterProps } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';

interface StateProps extends TaskDetailProps {
    readonly searchQuery: string;
    readonly taskServices: TaskServices;
}

function mapStateToProps(store: Store, ownProps: RouterProps): StateProps {
    const task: Task = selectTask(store, ownProps);
    return {
        task: task,
        savedTasksIdList: selectSavedTasksIdList(store),
        searchQuery: createRelatedServicesQueryFromTask(task),
        taskServices: selectTaskServices(task.id, store),
    };
}

interface DispatchProps extends TaskDetailActions {
    readonly requestUpdateTaskServices: (task: Task, query: string) => UpdateTaskServicesAsync.Request;
}

function mapDispatchToProps(dispatch: Dispatch<Store>): DispatchProps {
    return {
        addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
        removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
        toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
        requestUpdateTaskServices: (task: Task, query: string): UpdateTaskServicesAsync.Request => {
            return dispatch(updateTaskServicesAsync.request(task.id, query));
        },
    };
}

type ComponentProps = TaskDetailProps & TaskDetailActions & TaskServiceUpdater & RouterProps;

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps, routerProps: RouterProps): ComponentProps {
    return {
        task: stateProps.task,
        savedTasksIdList: stateProps.savedTasksIdList,
        taskServices: stateProps.taskServices,
        addToSavedList: dispatchProps.addToSavedList,
        removeFromSavedList: dispatchProps.removeFromSavedList,
        toggleCompleted: dispatchProps.toggleCompleted,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(stateProps.task, stateProps.searchQuery);
        },
        history: routerProps.history,
        location: routerProps.location,
        match: routerProps.match,
    };
}

export const TaskDetailConnectedComponent =
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
