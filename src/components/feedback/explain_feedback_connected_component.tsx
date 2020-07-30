import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    CloseAction,
    close,
} from '../../stores/feedback';
import { ExplainFeedbackComponent, ExplainFeedbackActions } from './explain_feedback_component';


const mapDispatchToProps = (dispatch: Dispatch<CloseAction>): ExplainFeedbackActions => ({
    close: (): CloseAction => dispatch(close()),
});

export const ExplainFeedbackConnectedComponent = connect(null, mapDispatchToProps)(ExplainFeedbackComponent);
