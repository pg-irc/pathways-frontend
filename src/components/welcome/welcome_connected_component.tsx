import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { withI18n } from '@lingui/react';
import { WelcomeComponent, WelcomeProps, WelcomeActions } from './welcome_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { selectLocale } from '../../selectors/locale/select_locale';
import { selectShowOnboarding } from '../../selectors/user_profile/select_show_onboarding';
import { pickRegion } from '../../selectors/region/pick_region';
import { RegionCode } from '../../validation/region/types';
import { saveRegion, SaveRegionAction } from '../../stores/user_profile';

function mapStateToProps(store: Store, routerProps: RouterProps): WelcomeProps {
    return {
        currentLocale: selectLocale(store),
        currentRegion: pickRegion(store),
        showOnboarding: selectShowOnboarding(store),
        history: routerProps.history,
    };
}

function mapDispatchToProps(dispatch: Dispatch<SaveLocaleRequestAction | SaveRegionAction>): WelcomeActions {
    return {
        saveLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => (
            dispatch(saveLocaleRequest(localeCode, flipOrientation))
        ),
        saveRegion: (regionCode: RegionCode): SaveRegionAction => (
            dispatch(saveRegion(regionCode))
        ),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(WelcomeComponent));
