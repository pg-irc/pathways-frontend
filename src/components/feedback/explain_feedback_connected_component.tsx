import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
    CloseAction,
    close,
} from '../../stores/feedback';
import { ExplainFeedbackComponent, ExplainFeedbackActions, ExplainFeedbackComponentProps } from './explain_feedback_component';
import { pickRegion } from '../../selectors/region/pick_region';
import { Store } from '../../stores';

const mapDispatchToProps = (dispatch: Dispatch<CloseAction>): ExplainFeedbackActions => ({
    close: (): CloseAction => dispatch(close()),
});

const mapStateToProps = (store: Store): ExplainFeedbackComponentProps => ({
    region: pickRegion(store),
});

export const ExplainFeedbackConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExplainFeedbackComponent);
