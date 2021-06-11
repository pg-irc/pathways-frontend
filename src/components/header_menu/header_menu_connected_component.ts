import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { selectLocale } from '../../selectors/locale/select_locale';
import { pickRegion } from '../../selectors/region/pick_region';
import { openLanguageDrawer, OpenLanguageDrawerAction } from '../../stores/user_experience/actions';

const mapStateToProps = (store: Store): HeaderMenuProps => ({
    currentLocale: selectLocale(store),
    currentRegion: pickRegion(store),
});

const mapDispatchToProps = (dispatch: Dispatch<OpenLanguageDrawerAction>): HeaderMenuActions => ({
    openLanguageDrawer: (): OpenLanguageDrawerAction => dispatch(openLanguageDrawer()),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);
