import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { RouterProps } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, TaskServiceUpdater,
} from './service_list_component';

const mapStateToProps = (store: Store, route: RouterProps): ServiceListProps => {
    const task: Task = selectCurrentTask(store, route);
    return {
        task: task,
        taskServices: selectTaskServices(task.id, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateTaskServicesAsync.Request>): ServiceListActions => ({
    requestUpdateOfServicesForTask: (task: Task): UpdateTaskServicesAsync.Request => {
        return dispatch(updateTaskServicesAsync.request(task.id));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & TaskServiceUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
        return actions.requestUpdateOfServicesForTask(props.task);
    },
});

export const ServicesConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
