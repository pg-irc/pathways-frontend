import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SetOnboardingAction, setOnboarding } from '../../stores/onboarding/actions';
import { OnboardingAction } from './onboarding_component';
import { OnboardingComponent, OnboardingComponentProps } from './onboarding_component';
import { History, Location } from 'history';
import { Store } from '../../stores';
import { Routes, getParametersFromPath } from '../../application/routing';

type OwnProps = {
    readonly history: History;
    readonly location?: Location;
};

const mapStateToProps = (_: Store, ownProps: OwnProps): OnboardingComponentProps => {
    return {
        history: ownProps.history,
        page: getParametersFromPath(ownProps.location, Routes.Onboarding).topicId,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<SetOnboardingAction>): OnboardingAction => ({
    setOnboarding: (): SetOnboardingAction => dispatch(setOnboarding()),
});

export const OnboardingConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OnboardingComponent);
