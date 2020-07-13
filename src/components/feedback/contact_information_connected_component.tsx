import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { connect } from 'react-redux';
import { selectIsSendingFeedback } from '../../selectors/feedback/select_is_sending_feedback';
import { ContactInformationProps, ContactInformationActions, ContactInformationComponent } from './contact_information_component';
import { BackFromContactInformationAction, backFromContactInformation, finishFeedback, FinishAction, SendFeedbackAction, sendFeedback } from '../../stores/feedback';
import { selectFeedbackType } from '../../selectors/feedback/select_feedback_type';
import { UserInformation } from '../../stores/feedback/types';

const mapStateToProps = (store: Store): ContactInformationProps => {
    return {
        feedbackType: selectFeedbackType(store),
        isSendingFeedback: selectIsSendingFeedback(store),
    };
};

type Actions = BackFromContactInformationAction | FinishAction | SendFeedbackAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ContactInformationActions => ({
    backFromContactInformation: (): BackFromContactInformationAction => dispatch(backFromContactInformation()),
    finishFeedback: (userInformation: UserInformation): FinishAction => dispatch(finishFeedback(userInformation)),
    sendFeedback: (serviceId: string): SendFeedbackAction => dispatch(sendFeedback(serviceId)),
});

export const ContactInformationConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContactInformationComponent);