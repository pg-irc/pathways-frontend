import { Dispatch } from 'redux';
import { Store } from '../../stores';
import * as actions from '../../stores/services/actions';
import { connect } from 'react-redux';
import { selectCurrentTopic } from '../../selectors/topics/select_current_topic';
import { Topic } from '../../selectors/topics/types';
import { selectServicesForTopic } from '../../selectors/services/select_services_for_topic';
import {
    ServiceListComponent, ServiceListProps, ServiceListActions } from './service_list_component';
import { RouterProps } from '../../application/routing';
import { selectManualUserLocation } from '../../selectors/services/select_manual_user_location';
import { UserLocation } from '../../validation/latlong/types';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { HumanServiceData } from '../../validation/services/types';
import { selectShowPartialLocalizationMessage } from '../../selectors/user_profile/select_show_partial_localization_message';
import { HidePartialLocalizationMessageAction, hidePartialLocalizationMessage } from '../../stores/user_profile';
import { SetManualUserLocationAction, setManualUserLocation } from '../../stores/manual_user_location';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { selectCustomLatLong } from '../../selectors/user_profile/select_custom_latlong';
import { SaveTopicServicesScrollOffsetAction, saveTopicServicesScrollOffset } from '../../stores/user_experience/actions';
import { selectIsSendingReview } from '../../selectors/reviews/select_is_sending_review';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceListProps => {
    const topic: Topic = selectCurrentTopic(store, ownProps.match.params.topicId);
    const manualUserLocation = selectManualUserLocation(store);
    return {
        topic,
        topicServicesOrError: selectServicesForTopic(topic.id, store),
        manualUserLocation,
        customLatLong: selectCustomLatLong(store),
        bookmarkedServicesIds: selectBookmarkedServicesIds(store),
        showPartialLocalizationMessage: selectShowPartialLocalizationMessage(store),
        isSendingReview: selectIsSendingReview(store),
    };
};

type Action = actions.ServicesAction | SetManualUserLocationAction | SaveTopicServicesScrollOffsetAction;

const mapDispatchToProps = (dispatch: Dispatch<Action>): ServiceListActions => ({
    dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation): actions.BuildServicesRequestAction =>
        dispatch(actions.buildServicesRequest(topic.id, manualUserLocation)),
    bookmarkService: (service: HumanServiceData): actions.BookmarkServiceAction => dispatch(actions.bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): actions.UnbookmarkServiceAction => dispatch(actions.unbookmarkService(service)),
    hidePartialLocalizationMessage: (): HidePartialLocalizationMessageAction => dispatch(hidePartialLocalizationMessage()),
    setManualUserLocation: (userLocation: UserLocation): SetManualUserLocationAction => dispatch(setManualUserLocation(userLocation)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    openServiceDetail: (service: HumanServiceData): actions.OpenServiceAction => dispatch(actions.openServiceDetail(service)),
    saveTopicServicesOffset: (offset: number): SaveTopicServicesScrollOffsetAction => dispatch(saveTopicServicesScrollOffset(offset)),
});

export const ServiceListConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceListComponent);
