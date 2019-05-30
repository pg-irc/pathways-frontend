import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { withI18n } from '@lingui/react';
import { WelcomeComponent, WelcomeProps, WelcomeActions } from './welcome_component';
import { Store } from '../../stores';
import { pullAvailableLocales } from '../../selectors/locale/pull_available_locales';
import { setLocaleActions, SetLocale } from '../../stores/locale';
import { selectLocale } from '../../selectors/locale/select_locale';

function mapStateToProps(store: Store, routerProps: RouterProps): WelcomeProps {
    return {
        currentLocale: selectLocale(store),
        availableLocales: pullAvailableLocales(store),
        history: routerProps.history,
    };
}

function mapDispatchToProps(dispatch: Dispatch<SetLocale.Request>): WelcomeActions {
    return {
        setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(WelcomeComponent));