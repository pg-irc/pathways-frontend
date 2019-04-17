import { UserDataPersistence } from '../user_data';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type SetOnboardingAction = Readonly<ReturnType<typeof setOnboarding>>;

export const setOnboarding = (showOnboarding: boolean) => (
    helpers.makeAction(constants.SET_ONBOARDING, { showOnboarding })
);

export type OnboardingAction =
    SetOnboardingAction |
    UserDataPersistence.LoadSuccessAction;