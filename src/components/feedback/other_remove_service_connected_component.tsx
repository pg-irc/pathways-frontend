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
    back, BackAction,
    CloseAction,
    close,
    cancelDiscardChanges,
    CancelDiscardChangesAction,
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

type Actions = SubmitAction | DiscardChangesAction | CloseAction | BackAction | CancelDiscardChangesAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): OtherRemoveServiceActions => ({
    submitFeedback: (feedback: Feedback): SubmitAction => dispatch(submit(feedback)),
    close: (): CloseAction => dispatch(close()),
    back: (): BackAction => dispatch(back()),
    discardFeedback: (): DiscardChangesAction => dispatch(discardChanges()),
    cancelDiscardFeedback: (): CancelDiscardChangesAction => dispatch(cancelDiscardChanges()),
});

export const OtherRemoveServiceConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OtherRemoveServiceComponent);