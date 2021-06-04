import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HideOnboardingAction, hideOnboarding } from '../../stores/user_profile';
import { OnboardingComponentActions } from './onboarding_component';
import { OnboardingComponent, OnboardingComponentProps } from './onboarding_component';
import { pickRegion } from '../../selectors/region/pick_region';
import { Store } from '../../stores';

const mapDispatchToProps = (dispatch: Dispatch<HideOnboardingAction>): OnboardingComponentActions => ({
    hideOnboarding: (): HideOnboardingAction => dispatch(hideOnboarding()),
});

const mapStateToProps = (store: Store): OnboardingComponentProps => ({
    region: pickRegion(store),
});

export const OnboardingConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OnboardingComponent);
