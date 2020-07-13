import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { connect } from 'react-redux';
import { selectIsSendingFeedback } from '../../selectors/feedback/select_is_sending_feedback';
import { ContactInformationProps, ContactInformationActions, ContactInformationComponent } from './contact_information_component';
import { BackFromContactInformationAction, backFromContactInformation } from '../../stores/feedback';
import { selectFeedbackType } from '../../selectors/feedback/select_feedback_type';

const mapStateToProps = (store: Store): ContactInformationProps => {
    return {
        feedbackType: selectFeedbackType(store),
        isSendingFeedback: selectIsSendingFeedback(store),
    };
};

type Actions = BackFromContactInformationAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ContactInformationActions => ({
    backFromContactInformation: (): BackFromContactInformationAction => dispatch(backFromContactInformation()),
});

export const ContactInformationConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContactInformationComponent);