import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { sendTopicServicesRequest, SendTopicServicesRequestAction } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTask } from '../../selectors/topics/select_current_task';
import { Topic } from '../../selectors/topics/topic';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, TaskServiceUpdater,
} from './service_list_component';
import { Routes, getParametersFromPath } from '../../application/routing';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): ServiceListProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.Services);
    const topic: Topic = selectCurrentTask(store, matchParams.topicId);
    return {
        topic,
        taskServicesOrError: selectTaskServices(topic.id, store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SendTopicServicesRequestAction>): ServiceListActions => ({
    requestUpdateOfServicesForTask: (topic: Topic): SendTopicServicesRequestAction => {
        return dispatch(sendTopicServicesRequest(topic.id));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & TaskServiceUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): SendTopicServicesRequestAction => {
        return actions.requestUpdateOfServicesForTask(props.topic);
    },
});

export const ServicesConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
