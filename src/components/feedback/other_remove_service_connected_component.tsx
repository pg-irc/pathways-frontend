import { Dispatch } from 'redux';
import { Store } from '../../stores';
import { connect } from 'react-redux';
import { Feedback } from '../../stores/feedback/types';
import { selectFeedbackModal } from '../../selectors/feedback/select_feedback_modal';
import { selectFeedbackScreen } from '../../selectors/feedback/select_feedback_screen';
import {
    SubmitAction,
    submit,
    discardChanges,
    DiscardChangesAction,
    CloseAction,
    close,
    cancelDiscardChanges,
    CancelDiscardChangesAction,
    CloseWithFeedbackAction,
    closeWithFeedback,
} from '../../stores/feedback';
import {
    OtherRemoveServiceComponent,
    OtherRemoveServiceState,
    OtherRemoveServiceActions,
} from './other_remove_service_component';

const mapStateToProps = (store: Store): OtherRemoveServiceState => {
    return {
        feedbackScreen: selectFeedbackScreen(store),
        feedbackModal: selectFeedbackModal(store),
    };
};

type Actions = SubmitAction | DiscardChangesAction | CloseAction | CloseWithFeedbackAction | CancelDiscardChangesAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OtherRemoveServiceActions => ({
    submitFeedback: (feedback: Feedback): SubmitAction => dispatch(submit(feedback)),
    close: (): CloseAction => dispatch(close()),
    closeWithFeedback: (): CloseWithFeedbackAction => dispatch(closeWithFeedback()),
    discardFeedback: (): DiscardChangesAction => dispatch(discardChanges()),
    cancelDiscardFeedback: (): CancelDiscardChangesAction => dispatch(cancelDiscardChanges()),
});

export const OtherRemoveServiceConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OtherRemoveServiceComponent);
