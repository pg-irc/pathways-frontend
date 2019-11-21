import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { buildServicesRequestAction, BuildServicesRequestAction } from '../../stores/services/actions';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/topic';
import { selectTopicServices } from '../../selectors/services/select_topic_services';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, ServicesUpdater,
} from './service_list_component';
import { RouterProps } from '../../application/routing';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { LatLong } from '../../validation/latlong/types';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceListProps => {
    const topic: Topic = selectCurrentTopic(store, ownProps.match.params.topicId);
    const manualUserLocation = selectManualUserLocation(store);
    return {
        topic,
        topicServicesOrError: selectTopicServices(topic.id, store),
        manualUserLocation,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<BuildServicesRequestAction>): ServiceListActions => ({
    dispatchServicesRequestAction: (topic: Topic, manualUserLocation?: LatLong): BuildServicesRequestAction => {
        return dispatch(buildServicesRequestAction(topic.id, manualUserLocation));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (stateProps: ServiceListProps, dispatchProps: ServiceListActions, ownProps: RouterProps): ComponentProps => ({
    ...stateProps, ...dispatchProps, ...ownProps,
    dispatchServicesRequest: (): BuildServicesRequestAction => {
        return dispatchProps.dispatchServicesRequestAction(stateProps.topic, stateProps.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
