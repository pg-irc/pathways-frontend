// tslint:disable:no-expression-statement
import { OnboardingStore, reducer, setOnboarding, disableAnalytics } from '../user_profile';
import { aBoolean } from '../../helpers/random_test_values';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { DataPersistence } from '../persisted_data';
import { clearAllUserData } from '../questionnaire/actions';

describe('user profile reducer', () => {
    describe('the onboarding flag', () => {
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
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowOnboarding(!onboardingFlag).
                build();
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
    describe('the disable analytics flag', () => {
        it('is set by the disable analytics action', () => {
            const oldStore: OnboardingStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: false,
            };
            const newStore = reducer(oldStore, disableAnalytics(true));
            expect(newStore.disableAnalytics).toBe(true);
        });
        it('is set by the disable analytics action', () => {
            const oldStore: OnboardingStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: true,
            };
            const newStore = reducer(oldStore, disableAnalytics(false));
            expect(newStore.disableAnalytics).toBe(false);

        });
        test('is loaded from persisted data', () => {
            const disableAnalyticsFlag = aBoolean();
            const oldStore: OnboardingStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: disableAnalyticsFlag,
            };
            const dataFlippingFlag = new PersistedDataBuilder().
                withDisableAnalytics(!disableAnalyticsFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);

            const newStore = reducer(oldStore, actionFlippingFlag);

            expect(newStore.disableAnalytics).toBe(!disableAnalyticsFlag);
        });
        test('is cleared by clean all user data action', () => {
            const oldStore: OnboardingStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: true,
            };
            const newStore = reducer(oldStore, clearAllUserData());

            expect(newStore.disableAnalytics).toBe(false);
        });
    });
});
