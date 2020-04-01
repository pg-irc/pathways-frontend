import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectServiceById } from '../../selectors/services/select_service_by_id';
import { ServiceDetailProps, ServiceDetailComponent, ServiceDetailActions } from './service_detail_component';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceDetailProps => {
    return {
        service: selectServiceById(store, ownProps.match.params.serviceId),
        history: ownProps.history,
        bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    };
};

type Actions = AnalyticsLinkPressedAction | BookmarkServiceAction | UnbookmarkServiceAction | OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ServiceDetailActions => ({
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
    dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const ServiceDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceDetailComponent);
