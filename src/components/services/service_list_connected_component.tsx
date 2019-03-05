import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { sendTaskServicesRequest, SendTaskServicesRequestAction } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/tasks/select_current_task';
import { Task } from '../../selectors/tasks/task';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, TaskServiceUpdater,
} from './service_list_component';
import { Routes, getParametersFromPath } from '../../application/routing';
import { selectTaskServicesError } from '../../selectors/services/select_task_services_error';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): ServiceListProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.Services);
    const task: Task = selectCurrentTask(store, matchParams.taskId);
    return {
        task: task,
        taskServices: selectTaskServices(task.id, store),
        taskServicesError: selectTaskServicesError(task.id, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SendTaskServicesRequestAction>): ServiceListActions => ({
    requestUpdateOfServicesForTask: (task: Task): SendTaskServicesRequestAction => {
        return dispatch(sendTaskServicesRequest(task.id));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & TaskServiceUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): SendTaskServicesRequestAction => {
        return actions.requestUpdateOfServicesForTask(props.task);
    },
});

export const ServicesConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
