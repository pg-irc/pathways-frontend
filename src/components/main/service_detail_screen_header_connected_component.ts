import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectServiceById } from '../../selectors/services/select_service_by_id';
import { getParametersFromPath, Routes } from '../../application/routing';
import { Store } from '../../stores';
import { ServiceDetailScreenHeaderProps, ServiceDetailScreenHeaderActions, ServiceDetailScreenHeaderComponent } from './service_detail_screen_header_component';
import { selectLocale } from '../../selectors/locale/select_locale';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService, DisableServiceFeedbackAction, disableServiceFeedback } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { History, Location } from 'history';
import { selectServiceFeedbackEnabled } from '../../selectors/services/select_service_feedback_enabled';

interface OwnProps {
    readonly history: History;
    readonly location: Location;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
    readonly openMenu: () => void;
}

const mapStateToProps = (store: Store, ownProps: OwnProps ): ServiceDetailScreenHeaderProps => {
    // getParamatersFromPath returns null when used in HeadersConnectedComponent
    const serviceParameters = getParametersFromPath(ownProps.location, Routes.ServiceDetail);
    return {
    currentLocale: selectLocale(store),
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    service: selectServiceById(store, serviceParameters.serviceId),
    feedbackEnabled: selectServiceFeedbackEnabled(store),
    };
};

type DispatchActions = BookmarkServiceAction | UnbookmarkServiceAction | DisableServiceFeedbackAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ServiceDetailScreenHeaderActions => ({
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    disableFeedback: (): DisableServiceFeedbackAction => dispatch(disableServiceFeedback()),
});

export const ServiceDetailScreenHeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceDetailScreenHeaderComponent);