import { withI18n } from '@lingui/react';
import { connect, Dispatch } from 'react-redux';
import { Welcome, WelcomeProps, WelcomeActions } from './welcome';
import { Store } from '../../application/store';
import { selectAvailableLocales, selectLocale } from '../../selectors/locale';
import { setLocaleActions, SetLocale } from '../../stores/locale';
import * as pageSwitcher from '../../stores/page_switcher';

function mapStateToProps(store: Store): WelcomeProps {
    return {
        isFirstRun: false,
        currentLocale: selectLocale(store),
        availableLocales: selectAvailableLocales(store),
    };
}

function mapDispatchToProps(dispatch: Dispatch<Store>): WelcomeActions {
    return {
        setLocale: (localeCode: string): SetLocale.Request => dispatch(setLocaleActions.request(localeCode)),
        goToExplore: (): pageSwitcher.SetExplorePageAction => dispatch(pageSwitcher.setExplorePage()),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(Welcome));