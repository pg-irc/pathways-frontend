import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withI18n } from '@lingui/react';
import { WelcomeComponent, WelcomeProps, WelcomeActions } from './welcome_component';
import { Store } from '../../stores';
import { pullAvailableLocales } from '../../selectors/locale/pull_available_locales';
import { SaveCurrentLocaleAsync } from '../../stores/locale';
import { selectLocale } from '../../selectors/locale/select_locale';

function mapStateToProps(store: Store): WelcomeProps {
    return {
        currentLocale: selectLocale(store),
        availableLocales: pullAvailableLocales(store),
    };
}

function mapDispatchToProps(dispatch: Dispatch<SaveCurrentLocaleAsync.Request>): WelcomeActions {
    return {
        setLocale: (localeCode: string): SaveCurrentLocaleAsync.Request => dispatch(SaveCurrentLocaleAsync.request(localeCode)),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(WelcomeComponent));