// tslint:disable:no-expression-statement
import { OnboardingStore, reducer, setOnboarding } from '../user_profile';
import { aBoolean } from '../../helpers/random_test_values';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { DataPersistence } from '../persisted_data';
import { clearAllUserData } from '../questionnaire/actions';

describe('user profile reducer', () => {
    describe('onboarding flag', () => {
        test('is cleared by the set onboarding action', () => {
            const oldStore: OnboardingStore = {
                showOnboarding: true,
                disableAnalytics: aBoolean(),
            };
            const newStore = reducer(oldStore, setOnboarding());
            expect(newStore.showOnboarding).toBe(false);
        });

        test('is loaded from persisted data', () => {
            const onboardingFlag = aBoolean();
            const oldStore: OnboardingStore = {
                showOnboarding: onboardingFlag,
                disableAnalytics: aBoolean(),
            };
            const dataFlippingFlag = new PersistedUserDataBuilder().
                addShowOnboarding(!onboardingFlag).
                buildObject();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);

            const newStore = reducer(oldStore, actionFlippingFlag);

            expect(newStore.showOnboarding).toBe(!onboardingFlag);
        });

        test('is set by clean all user data action', () => {
            const oldStore: OnboardingStore = {
                showOnboarding: false,
                disableAnalytics: aBoolean(),
            };
            const newStore = reducer(oldStore, clearAllUserData());

            expect(newStore.showOnboarding).toBe(true);
        });
    });
});
