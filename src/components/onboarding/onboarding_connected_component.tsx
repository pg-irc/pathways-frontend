import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HideOnboardingAction, hideOnboarding } from '../../stores/user_profile';
import { OnboardingComponentActions } from './onboarding_component';
import { OnboardingComponent } from './onboarding_component';

const mapDispatchToProps = (dispatch: Dispatch<HideOnboardingAction>): OnboardingComponentActions => ({
    hideOnboarding: (): HideOnboardingAction => dispatch(hideOnboarding()),
});

export const OnboardingConnectedComponent = connect(undefined, mapDispatchToProps)(OnboardingComponent);
