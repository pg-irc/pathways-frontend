import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { connect } from 'react-redux';
import { selectIsSendingFeedback } from '../../selectors/feedback/select_is_sending_feedback';
import { ContactInformationProps, ContactInformationActions, ContactInformationComponent } from './contact_information_component';
import { BackFromContactInformationAction, backFromContactInformation } from '../../stores/feedback';

const mapStateToProps = (store: Store): ContactInformationProps => {
    return {
        isSendingFeedback: selectIsSendingFeedback(store),
    };
};

type Actions = BackFromContactInformationAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ContactInformationActions => ({
    backFromContactInformation: (): BackFromContactInformationAction => dispatch(backFromContactInformation()),
});

export const ContactInformationConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContactInformationComponent);