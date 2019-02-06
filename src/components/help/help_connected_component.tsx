import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HelpComponentActions, HelpComponent, HelpComponentProps } from './help_component';
import { clearAllUserData, ClearAllUserDataAction } from '../../stores/questionnaire/actions';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (_: Store, ownProps: RouterProps): HelpComponentProps => ({
    history: ownProps.history,
});

const mapDispatchToProps = (dispatch: Dispatch<ClearAllUserDataAction>): HelpComponentActions => ({
    clearAllUserState: (): ClearAllUserDataAction => dispatch(clearAllUserData()),
});

export const HelpConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
