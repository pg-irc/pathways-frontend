import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SetOnboardingAction, setOnboarding } from '../../stores/user_flags';
import { OnboardingActions } from './onboarding_component';
import { OnboardingComponent } from './onboarding_component';

const mapDispatchToProps = (dispatch: Dispatch<SetOnboardingAction>): OnboardingActions => ({
    setOnboarding: (): SetOnboardingAction => dispatch(setOnboarding()),
});

export const OnboardingConnectedComponent = connect(undefined, mapDispatchToProps)(OnboardingComponent);
