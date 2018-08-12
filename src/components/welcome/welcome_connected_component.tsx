import { withI18n } from '@lingui/react';
import { connect, Dispatch } from 'react-redux';
import { Welcome, WelcomeProps, WelcomeActions } from './welcome';
import { Store } from '../../stores';
import { pullAvailableLocales } from '../../selectors/locale/pull_available_locales';
import { setLocaleActions, SetLocale } from '../../stores/locale';
import { selectLocale } from '../../selectors/locale/select_locale';

function mapStateToProps(store: Store): WelcomeProps {
    return {
        isFirstRun: false,
        currentLocale: selectLocale(store),
        availableLocales: pullAvailableLocales(store),
    };
}

function mapDispatchToProps(dispatch: Dispatch<Store>): WelcomeActions {
    return {
        setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(Welcome));