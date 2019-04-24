import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SetOnboardingAction, setOnboarding } from '../../stores/onboarding/actions';
import { OnboardingAction } from './onboarding_component';
import { OnboardingComponent, OnboardingComponentProps } from './onboarding_component';
import { History } from 'history';
import { Store } from '../../stores';

type OwnProps = {
    readonly history: History;
};

const mapStateToProps = (_: Store, ownProps: OwnProps): OnboardingComponentProps => {
    return { history: ownProps.history };
};

const mapDispatchToProps = (dispatch: Dispatch<SetOnboardingAction>): OnboardingAction => ({
    setOnboarding: (): SetOnboardingAction => dispatch(setOnboarding()),
});

export const OnboardingConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OnboardingComponent);
