import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { sendTopicServicesRequest, SendTopicServicesRequestAction } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/topic';
import { selectTaskServices } from '../../selectors/services/select_task_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, TaskServiceUpdater,
} from './service_list_component';
import { Routes, getParametersFromPath } from '../../application/routing';
import { LatLong } from '../../stores/manual_user_location';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';

type OwnProps = {
    readonly location: Location;
};

const mapStateToProps = (store: Store, ownProps: OwnProps): ServiceListProps => {
    const matchParams = getParametersFromPath(ownProps.location, Routes.Services);
    const topic: Topic = selectCurrentTopic(store, matchParams.topicId);
    const manualUserLocation = selectManualUserLocation(store);
    return {
        topic,
        taskServicesOrError: selectTaskServices(topic.id, store),
        manualUserLocation,
        currentPath: ownProps.location.pathname,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SendTopicServicesRequestAction>): ServiceListActions => ({
    requestUpdateOfServicesForTask: (topic: Topic, manualUserLocation?: LatLong): SendTopicServicesRequestAction => {
        return dispatch(sendTopicServicesRequest(topic.id, manualUserLocation));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & TaskServiceUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    requestUpdateTaskServices: (): SendTopicServicesRequestAction => {
        return actions.requestUpdateOfServicesForTask(props.topic, props.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
