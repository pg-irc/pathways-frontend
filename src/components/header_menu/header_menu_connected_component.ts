import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HeaderMenuComponent, HeaderMenuProps, HeaderMenuActions } from './header_menu_component';
import { Store } from '../../stores';
import { SetLocaleRequestAction, setLocaleRequest } from '../../stores/locale';
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

const mapDispatchToProps = (dispatch: Dispatch<SetLocaleRequestAction>): HeaderMenuActions => ({
    setLocale: (localeCode: string): SetLocaleRequestAction => dispatch(setLocaleRequest(localeCode)),
});

export const HeaderMenuConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderMenuComponent);