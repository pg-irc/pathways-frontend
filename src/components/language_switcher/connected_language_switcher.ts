import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { LanguageSwitcher, Props, Actions } from './language_switcher';
import { Store } from '../../stores';
import { SetLocale, setLocaleActions } from '../../stores/locale';
import { pullAvailableLocales } from '../../selectors/locale/pull_available_locales';
import { LocaleInfo } from '../../locale';
import { selectLocale } from '../../selectors/locale/select_locale';

const mapStateToProps = (store: Store): Props => {
    const locales = pullAvailableLocales(store);
    const locale = selectLocale(store);
    const currentLocale = locales.find((aLocale: LocaleInfo) => locale.code === aLocale.code);
    const availableLocales = locales.filter((aLocale: LocaleInfo) => locale.code !== aLocale.code);
    return { currentLocale, availableLocales };
};

const mapDispatchToProps = (dispatch: Dispatch<SetLocale.Request>): Actions => ({
    setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
});

export const ConnectedLanguageSwitcher = connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);