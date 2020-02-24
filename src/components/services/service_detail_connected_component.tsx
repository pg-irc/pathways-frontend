import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectServiceById } from '../../selectors/services/select_service_by_id';
import { ServiceDetailProps, ServiceDetailComponent, ServiceDetailActions } from './service_detail_component';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { selectServiceFeedbackEnabled } from '../../selectors/services/select_service_feedback_enabled';
import { EnableServiceFeedbackAction, enableServiceFeedback, DisableServiceFeedbackAction, disableServiceFeedback } from '../../stores/services/actions';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceDetailProps => {
    return {
        service: selectServiceById(store, ownProps.match.params.serviceId),
        history: ownProps.history,
        feedbackEnabled: selectServiceFeedbackEnabled(store),
    };
};

type DispatchActions = AnalyticsLinkPressedAction | EnableServiceFeedbackAction | DisableServiceFeedbackAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ServiceDetailActions => ({
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
    dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
    enableFeedback: (): EnableServiceFeedbackAction => dispatch(enableServiceFeedback()),
    disableFeedback: (): DisableServiceFeedbackAction => dispatch(disableServiceFeedback()),
});

export const ServiceDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceDetailComponent);
