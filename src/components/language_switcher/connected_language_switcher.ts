import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { LanguageSwitcher, Props, Actions } from './language_switcher';
import { Store } from '../../application/store';
import { SetLocale, setLocaleActions } from '../../stores/locale';
import { selectLocale } from '../../selectors/locale';
import { Locale, LocaleManager } from '../../application/locale';

const mapStateToProps = (store: Store): Props => {
    return {
        currentLocale: LocaleManager.getLocale(selectLocale(store)),
        locales: LocaleManager.locales,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    setLocale: (locale: Locale): SetLocale.Request => dispatch(setLocaleActions.request(locale)),
});

export const ConnectedLanguageSwitcher = connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);