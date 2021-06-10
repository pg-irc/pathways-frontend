import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closeLanguageDrawer, CloseLanguageDrawerAction } from '../../stores/user_experience/actions';
import { LanguageDrawerActions, LanguageDrawerComponent } from './language_drawer_component';

const mapDispatchToProps = (dispatch: Dispatch<CloseLanguageDrawerAction>): LanguageDrawerActions => ({
    closeLanguageDrawer: (): CloseLanguageDrawerAction => dispatch(closeLanguageDrawer()),
});

export const LanguageDrawerConnectedComponent = connect(undefined, mapDispatchToProps)(LanguageDrawerComponent);
