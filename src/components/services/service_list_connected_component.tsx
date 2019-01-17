import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { Task } from '../../selectors/tasks/task';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, TaskServiceUpdater,
} from './service_list_component';
import { Routes, getMatchParamsFromPathAndRoute } from '../../application/routing';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): ServiceListProps => {
    const matchParams = getMatchParamsFromPathAndRoute(ownProps.location.pathname, Routes.Services);
    const task: Task = selectCurrentTask(store, matchParams.taskId);
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
