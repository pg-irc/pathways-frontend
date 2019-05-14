import { UserDataPersistence } from '../user_data';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { ClearAllUserDataAction } from '../questionnaire/actions';

export type SetOnboardingAction = Readonly<ReturnType<typeof setOnboarding>>;

export const setOnboarding = () => (
    helpers.makeAction(constants.SET_ONBOARDING)
);

export type OnboardingAction =
    SetOnboardingAction |
    ClearAllUserDataAction|
    UserDataPersistence.LoadSuccessAction;