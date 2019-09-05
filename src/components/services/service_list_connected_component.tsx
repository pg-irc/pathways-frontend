import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { buildTopicServicesRequestAction, BuildTopicServicesRequestAction } from '../../stores/services/actions';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/topic';
import { selectTopicServices } from '../../selectors/services/select_topic_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, ServicesUpdater,
} from './service_list_component';
import { Routes, getParametersFromPath } from '../../application/routing';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { LatLong } from '../search/types';

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

const mapDispatchToProps = (dispatch: Dispatch<BuildTopicServicesRequestAction>): ServiceListActions => ({
    dispatchServicesRequestAction: (topic: Topic, manualUserLocation?: LatLong): BuildTopicServicesRequestAction => {
        return dispatch(buildTopicServicesRequestAction(topic.id, manualUserLocation));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    dispatchServicesRequest: (): BuildTopicServicesRequestAction => {
        return actions.dispatchServicesRequestAction(props.topic, props.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
