import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { withI18n } from '@lingui/react';
import { WelcomeComponent, WelcomeProps, WelcomeActions } from './welcome_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest, ResetLocaleAction, resetLocale } from '../../stores/locale/actions';
import { selectLocale } from '../../selectors/locale/select_locale';
import { selectShowOnboarding } from '../../selectors/user_profile/select_show_onboarding';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';
import { selectRegion } from '../../selectors/region/select_region';
import { saveRegion, SaveRegionAction } from '../../stores/region/actions';
import { RegionCode } from '../../region/types';

function mapStateToProps(store: Store, routerProps: RouterProps): WelcomeProps {
    return {
        currentLocale: selectLocale(store),
        currentRegion: selectRegion(store),
        availableLocales: selectAvailableLocales(store),
        showOnboarding: selectShowOnboarding(store),
        history: routerProps.history,
    };
}

function mapDispatchToProps(dispatch: Dispatch<SaveLocaleRequestAction | ResetLocaleAction | SaveRegionAction>): WelcomeActions {
    return {
        setLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => (
            dispatch(saveLocaleRequest(localeCode, flipOrientation))
        ),
        resetLocale: (): ResetLocaleAction => (
            dispatch(resetLocale())
        ),
        setRegion: (provinceCode: RegionCode): SaveRegionAction => (
            dispatch(saveRegion(provinceCode))
        ),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(WelcomeComponent));