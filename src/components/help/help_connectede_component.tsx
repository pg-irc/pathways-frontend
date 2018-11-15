import { connect, Dispatch } from 'react-redux';
import { Store } from '../../stores';
import { HelpComponentActions, HelpComponent, HelpComponentProps } from './help_component';
import { clearAllUserData, ClearAllUserDataAction } from '../../stores/questionnaire/actions';

const mapStateToProps = (_: Store): HelpComponentProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): HelpComponentActions => ({
    clearAllUserState: (): ClearAllUserDataAction => dispatch(clearAllUserData()),
});

export const HelpConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
