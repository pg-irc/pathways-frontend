import { Dispatch } from 'redux';
import { Store } from '../../stores';
import * as actions from '../../stores/services/actions';
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
import { UserLocation } from '../../validation/latlong/types';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { HumanServiceData } from '../../validation/services/types';
import { selectShowPartialLocalizationMessage } from '../../selectors/user_profile/select_show_partial_localization_message';
import { HidePartialLocalizationMessageAction, hidePartialLocalizationMessage } from '../../stores/user_profile';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceListProps => {
    const topic: Topic = selectCurrentTopic(store, ownProps.match.params.topicId);
    const manualUserLocation = selectManualUserLocation(store);
    return {
        topic,
        topicServicesOrError: selectServicesForTopic(topic.id, store),
        manualUserLocation,
        bookmarkedServicesIds: selectBookmarkedServicesIds(store),
        showPartialLocalizationMessage: selectShowPartialLocalizationMessage(store),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ServicesAction>): ServiceListActions => ({
    dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation): actions.BuildServicesRequestAction =>
        dispatch(actions.buildServicesRequest(topic.id, manualUserLocation)),
    bookmarkService: (service: HumanServiceData): actions.BookmarkServiceAction => dispatch(actions.bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): actions.UnbookmarkServiceAction => dispatch(actions.unbookmarkService(service)),
    hidePartialLocalizationMessage: (): HidePartialLocalizationMessageAction => dispatch(hidePartialLocalizationMessage()),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    openServiceDetail: (service: HumanServiceData): actions.OpenServiceAction => dispatch(actions.openServiceDetail(service)),
    setLatLongForServices: (location: string): actions.SetLatLongForServicesAction => dispatch(actions.setLatLongForServices(location)),
});

type ComponentProps = ServiceListProps & ServiceListActions & ServicesUpdater;

const mergeProps = (stateProps: ServiceListProps, dispatchProps: ServiceListActions, ownProps: RouterProps): ComponentProps => ({
    ...stateProps, ...dispatchProps, ...ownProps,
    dispatchServicesRequest: (): actions.BuildServicesRequestAction => {
        return dispatchProps.dispatchServicesRequest(stateProps.topic, stateProps.manualUserLocation);
    },
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ServiceListComponent);
