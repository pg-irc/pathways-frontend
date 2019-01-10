import { Dispatch } from 'redux';
import { History } from 'history';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SetLocale, setLocaleActions } from '../../stores/locale';
import { pullAvailableLocales } from '../../selectors/locale/pull_available_locales';
import { LocaleInfo } from '../../locale';
import { selectLocale } from '../../selectors/locale/select_locale';

type OtherProps = {
    readonly history: History;
    readonly closeMenu: () => void;
};

const mapStateToProps = (store: Store, otherProps: OtherProps): HeaderMenuProps => {
    const locales = pullAvailableLocales(store);
    const locale = selectLocale(store);
    const currentLocale = locales.find((aLocale: LocaleInfo) => locale.code === aLocale.code);
    const availableLocales = locales.filter((aLocale: LocaleInfo) => locale.code !== aLocale.code);
    return { currentLocale, availableLocales, history: otherProps.history };
};

const mapDispatchToProps = (dispatch: Dispatch<SetLocale.Request>, otherProps: OtherProps): HeaderMenuActions => ({
    setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
    closeMenu: otherProps.closeMenu,
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);