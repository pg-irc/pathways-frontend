import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { LanguageSwitcher, Props, Actions } from './language_switcher';
import { Store } from '../../application/store';
import { SetLocale, setLocaleActions } from '../../stores/locale';
import { selectLocale } from '../../selectors/locale';
import { LocaleDefinitionManager } from '../../locale';

const mapStateToProps = (store: Store): Props => {
    return {
        currentLocale: selectLocale(store),
        locales: LocaleDefinitionManager.all,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
});

export const ConnectedLanguageSwitcher = connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);