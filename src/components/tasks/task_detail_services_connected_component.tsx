import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { RouterProps } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import { TaskDetailServicesComponent, TaskDetailServicesProps,
         TaskDetailServicesActions, TaskServiceUpdater } from './task_detail_services_component';

const mapStateToProps = (store: Store, route: RouterProps): TaskDetailServicesProps => {
    const task: Task = selectCurrentTask(store, route);
    return {
        task: task,
        taskServices: selectTaskServices(task.id, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskDetailServicesActions => ({
    requestUpdateOfServicesForTask: (task: Task): UpdateTaskServicesAsync.Request => {
        return dispatch(updateTaskServicesAsync.request(task.id, task.serviceQuery));
    },
});

type ComponentProps = TaskDetailServicesProps & TaskDetailServicesActions & TaskServiceUpdater;

const mergeProps = (props: TaskDetailServicesProps, actions: TaskDetailServicesActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
        return actions.requestUpdateOfServicesForTask(props.task);
    },
});

export const TaskDetailServicesConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailServicesComponent);
