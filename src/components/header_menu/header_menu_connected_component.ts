import { Dispatch } from 'redux';
import { History } from 'history';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SetLocale, setLocaleActions } from '../../stores/locale';
import { LocaleInfo } from '../../locale';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectLocale } from '../../selectors/locale/select_locale';

const mapStateToProps = (store: Store): HeaderMenuProps => {
    const locales = selectAvailableLocales(store);
    const locale = selectLocale(store);
    const currentLocale = locales.find((aLocale: LocaleInfo) => locale.code === aLocale.code);
    const availableLocales = locales.filter((aLocale: LocaleInfo) => locale.code !== aLocale.code);
    return { currentLocale, availableLocales };
};

const mapDispatchToProps = (dispatch: Dispatch<SetLocale.Request>): HeaderMenuActions => ({
    setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);