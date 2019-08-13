import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { sendTopicServicesRequest, SendTopicServicesRequestAction } from '../../stores/services';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/topic';
import { selectTopicServices } from '../../selectors/services/select_topic_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, ServicesUpdater,
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
        topicServicesOrError: selectTopicServices(topic.id, store),
        manualUserLocation,
        currentPath: ownProps.location.pathname,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SendTopicServicesRequestAction>): ServiceListActions => ({
    requestTopicServicesWithParameters: (topic: Topic, manualUserLocation?: LatLong): SendTopicServicesRequestAction => {
        return dispatch(sendTopicServicesRequest(topic.id, manualUserLocation));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    requestTopicServices: (): SendTopicServicesRequestAction => {
        return actions.requestTopicServicesWithParameters(props.topic, props.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
