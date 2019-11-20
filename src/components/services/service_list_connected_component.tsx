import { Dispatch } from 'redux';
import { Location } from 'history';
import { Store } from '../../stores';
import { buildServicesRequestAction, BuildServicesRequestAction, ServicesAction, AddServiceToSavedListAction,
    addServiceToSavedListAction, removeServiceFromSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';
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
import { LatLong } from '../../validation/latlong/types';
import { Id } from '../../stores/services';

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
        savedServices: store.services.savedServices,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ServicesAction>): ServiceListActions => ({
    dispatchServicesRequestAction: (topic: Topic, manualUserLocation?: LatLong): BuildServicesRequestAction => {
        return dispatch(buildServicesRequestAction(topic.id, manualUserLocation));
    },
    addServiceToSavedListAction: (serviceId: Id): AddServiceToSavedListAction => {
        return dispatch(addServiceToSavedListAction(serviceId));
    },
    removeServiceFromSavedListAction: (serviceId: Id): RemoveServiceFromSavedListAction => {
        return dispatch(removeServiceFromSavedListAction(serviceId));
    },
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (props: ServiceListProps, actions: ServiceListActions): ComponentProps => ({
    ...props, ...actions,
    dispatchServicesRequest: (): BuildServicesRequestAction => {
        return actions.dispatchServicesRequestAction(props.topic, props.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
