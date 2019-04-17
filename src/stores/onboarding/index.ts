import * as constants from '../../application/constants';
import { OnboardingAction } from './actions';

export interface OnboardingStore {
    readonly showOnboarding: boolean;
}

export function buildDefaultStore(): OnboardingStore {
    return {showOnboarding: false};
}

export const reducer = (store: OnboardingStore = buildDefaultStore(), action?: OnboardingAction): OnboardingStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_ONBOARDING:
            return ({
                ...store,
                showOnboarding: action.payload.showOnboarding,
            });
        case constants.LOAD_USER_DATA_SUCCESS:
            return ({
                ...store,
                showOnboarding: action.payload.showOnboarding,
            });
        default:
            return store;
    }
}