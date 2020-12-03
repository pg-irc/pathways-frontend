import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectServiceById } from '../../selectors/services/select_service_by_id';
import { ServiceDetailProps, ServiceDetailComponent, ServiceDetailActions } from './service_detail_component';
import { RouterProps } from '../../application/routing';
import { Dispatch } from 'redux';
import { AnalyticsLinkPressedAction, analyticsLinkPressed, AnalyticsLinkProps } from '../../stores/analytics';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { Feedback, UserInformation } from '../../stores/feedback/types';
import { selectFeedbackScreen } from '../../selectors/feedback/select_feedback_screen';
import { selectFeedbackModal } from '../../selectors/feedback/select_feedback_modal';
import {
    submit,
    SubmitAction,
    SuggestAnUpdateAction,
    suggestAnUpdate,
    ChooseChangeNameOrDetailsAction,
    chooseChangeNameOrDetails,
    ChooseRemoveServiceAction,
    chooseRemoveService,
    ChooseOtherChangesAction,
    chooseOtherChanges,
    finishFeedback,
    FinishAction,
    close,
    CloseAction,
    DiscardChangesAction,
    discardChanges,
    CancelDiscardChangesAction,
    cancelDiscardChanges,
    SendFeedbackAction,
    sendFeedback,
    CloseWithFeedbackAction,
    closeWithFeedback,
    BackFromContactInformationAction,
    backFromContactInformation,
    ChooseExplainFeedbackAction,
    chooseExplainFeedback,
} from '../../stores/feedback';
import { selectIsSendingFeedback } from '../../selectors/feedback/select_is_sending_feedback';
import { selectShowLinkAlerts } from '../../selectors/user_profile/select_show_link_alerts';
import { HideLinkAlertsAction, hideLinkAlerts } from '../../stores/user_profile';
import { selectFeedbackType } from '../../selectors/feedback/select_feedback_type';
import { selectServiceFeedback } from '../../selectors/feedback/select_service_feedback';
import { openOrganization, OpenOrganizationAction } from '../../stores/organization/actions';

const mapStateToProps = (store: Store, ownProps: RouterProps): ServiceDetailProps => {
    return {
        service: selectServiceById(store, ownProps.match.params.serviceId),
        history: ownProps.history,
        bookmarkedServicesIds: selectBookmarkedServicesIds(store),
        serviceFeedback: selectServiceFeedback(store),
        feedbackType: selectFeedbackType(store),
        feedbackScreen: selectFeedbackScreen(store),
        feedbackModal: selectFeedbackModal(store),
        isSendingFeedback: selectIsSendingFeedback(store),
        showLinkAlerts: selectShowLinkAlerts(store),
    };
};

type Actions =
    AnalyticsLinkPressedAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    OpenHeaderMenuAction |
    OpenOrganizationAction |
    SuggestAnUpdateAction |
    ChooseChangeNameOrDetailsAction |
    ChooseRemoveServiceAction |
    ChooseOtherChangesAction |
    ChooseExplainFeedbackAction |
    SubmitAction |
    FinishAction |
    CloseAction |
    CloseWithFeedbackAction |
    DiscardChangesAction |
    CloseAction |
    CancelDiscardChangesAction |
    SendFeedbackAction |
    HideLinkAlertsAction |
    BackFromContactInformationAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ServiceDetailActions => ({
    analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(analyticsLinkProps)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    suggestAnUpdate: (): SuggestAnUpdateAction => dispatch(suggestAnUpdate()),
    chooseChangeNameOrDetail: (): ChooseChangeNameOrDetailsAction => dispatch(chooseChangeNameOrDetails()),
    chooseRemoveService: (): ChooseRemoveServiceAction => dispatch(chooseRemoveService()),
    chooseOtherChanges: (): ChooseOtherChangesAction => dispatch(chooseOtherChanges()),
    chooseExplainFeedback: (): ChooseExplainFeedbackAction => dispatch(chooseExplainFeedback()),
    submitFeedback: (feedback: Feedback): SubmitAction => dispatch(submit(feedback)),
    finishFeedback: (userInformation: UserInformation): FinishAction => dispatch(finishFeedback(userInformation)),
    close: (): CloseAction => dispatch(close()),
    closeWithFeedback: (): CloseWithFeedbackAction => dispatch(closeWithFeedback()),
    discardFeedback: (): DiscardChangesAction => dispatch(discardChanges()),
    cancelDiscardFeedback: (): CancelDiscardChangesAction => dispatch(cancelDiscardChanges()),
    sendFeedback: (serviceId: string): SendFeedbackAction => dispatch(sendFeedback(serviceId)),
    hideLinkAlerts: (): HideLinkAlertsAction => dispatch(hideLinkAlerts()),
    backFromContactInformation: (): BackFromContactInformationAction => dispatch(backFromContactInformation()),
    openOrganization: (organizationId: string): OpenOrganizationAction => dispatch(openOrganization(organizationId)),
});

export const ServiceDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ServiceDetailComponent);
