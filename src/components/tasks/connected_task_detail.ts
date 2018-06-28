import { TaskDetail as Component, Actions } from './task_detail';
import { Dispatch } from 'redux';
import { Store } from '../../application/store';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { Props } from './task_detail';
import { TaskServices, selectTaskServices, createRelatedServicesQueryFromTask } from '../../selectors/services';
import { Task } from '../../selectors/tasks';
import { connect } from 'react-redux';
import { selectLocale } from '../../selectors/locale';

interface StateProps {
    readonly query: string;
    readonly taskServices: TaskServices;
}

function mapStateToProps(store: Store, ownProps: OwnProps): StateProps {
    const servicesStore = store.applicationState.servicesInStore;
    const locale = selectLocale(store);
    return {
        query: createRelatedServicesQueryFromTask(ownProps.task),
        taskServices: selectTaskServices(locale, ownProps.task.id, servicesStore),
    };
}

interface DispatchProps {
    readonly requestUpdateTaskServices: (task: Task, query: string) => UpdateTaskServicesAsync.Request;
}

function mapDispatchToProps(dispatch: Dispatch<Store>): DispatchProps {
    return {
        requestUpdateTaskServices: (task: Task, query: string): UpdateTaskServicesAsync.Request => {
            return dispatch(updateTaskServicesAsync.request(task.id, query));
        },
    };
}

interface OwnProps {
    readonly task: Task;
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps): Props & Actions {
    return {
        task: ownProps.task,
        taskServices: stateProps.taskServices,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(ownProps.task, stateProps.query);
        },
    };
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component);