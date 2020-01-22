import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { buildServicesRequest, BuildServicesRequestAction, ServicesAction, BookmarkServiceAction,
        UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/types';
import { selectServicesForTopic } from '../../selectors/services/select_services_for_topic';
import {
    ServiceListComponent, ServiceListProps,
    ServiceListActions, ServicesUpdater,
} from './service_list_component';
import { RouterProps } from '../../application/routing';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { LatLong } from '../../validation/latlong/types';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceListProps => {
    const topic: Topic = selectCurrentTopic(store, ownProps.match.params.topicId);
    const manualUserLocation = selectManualUserLocation(store);
    return {
        topic,
        topicServicesOrError: selectServicesForTopic(topic.id, store),
        manualUserLocation,
        bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ServicesAction>): ServiceListActions => ({
    dispatchServicesRequest: (topic: Topic, manualUserLocation?: LatLong): BuildServicesRequestAction =>
        dispatch(buildServicesRequest(topic.id, manualUserLocation)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (stateProps: ServiceListProps, dispatchProps: ServiceListActions, ownProps: RouterProps): ComponentProps => ({
    ...stateProps, ...dispatchProps, ...ownProps,
    dispatchServicesRequest: (): BuildServicesRequestAction => {
        return dispatchProps.dispatchServicesRequest(stateProps.topic, stateProps.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
