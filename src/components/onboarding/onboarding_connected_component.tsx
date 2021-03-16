import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HideOnboardingAction, hideOnboarding } from '../../stores/user_profile';
import { OnboardingComponentActions, OnboardingComponent, OnboardingComponentProps } from './onboarding_component';
import { Store } from '../../stores';
import { selectIsRTL } from '../../selectors/locale/select_is_RTL';

const mapStateToProps = (store: Store): OnboardingComponentProps  => ({
    isRTL: selectIsRTL(store),
});

const mapDispatchToProps = (dispatch: Dispatch<HideOnboardingAction>): OnboardingComponentActions => ({
    hideOnboarding: (): HideOnboardingAction => dispatch(hideOnboarding()),
});

export const OnboardingConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OnboardingComponent);
