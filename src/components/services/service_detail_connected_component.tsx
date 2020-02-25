import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectServiceById } from '../../selectors/services/select_service_by_id';
import { ServiceDetailProps, ServiceDetailComponent, ServiceDetailActions } from './service_detail_component';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { selectServiceFeedbackEnabled } from '../../selectors/services/select_service_feedback_enabled';
import { 
    EnableServiceFeedbackAction, enableServiceFeedback, DisableServiceFeedbackAction, disableServiceFeedback,
    closeDiscardFeedbackModal, CloseDiscardFeedbackModalAction, OpenDiscardFeedbackModalAction, openDiscardFeedbackModal,
} from '../../stores/services/actions';
import { selectDiscardFeedbackModalIsVisible } from '../../selectors/services/select_discard_feedback_modal_is_visible';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceDetailProps => {
    return {
        service: selectServiceById(store, ownProps.match.params.serviceId),
        history: ownProps.history,
        feedbackEnabled: selectServiceFeedbackEnabled(store),
        discardFeedbackModalIsVisible: selectDiscardFeedbackModalIsVisible(store),
    };
};

type DispatchActions =
    AnalyticsLinkPressedAction |
    EnableServiceFeedbackAction |
    DisableServiceFeedbackAction |
    OpenDiscardFeedbackModalAction |
    CloseDiscardFeedbackModalAction
    ;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ServiceDetailActions => ({
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
    dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
    enableFeedback: (): EnableServiceFeedbackAction => dispatch(enableServiceFeedback()),
    disableFeedback: (): DisableServiceFeedbackAction => dispatch(disableServiceFeedback()),
    openDiscardFeedbackModal: (): OpenDiscardFeedbackModalAction => dispatch(openDiscardFeedbackModal()),
    closeDiscardFeedbackModal: (): CloseDiscardFeedbackModalAction => dispatch(closeDiscardFeedbackModal()),
});

export const ServiceDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceDetailComponent);
