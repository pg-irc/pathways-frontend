// tslint:disable:no-expression-statement
import { UserProfileStore, reducer, setOnboarding, disableAnalytics, setShowPartialLocalizationMessage } from '../user_profile';
import { aBoolean } from '../../helpers/random_test_values';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { DataPersistence } from '../persisted_data';
import { clearAllUserData } from '../questionnaire/actions';

describe('user profile reducer', () => {

    describe('the onboarding flag', () => {

        test('is cleared by the set onboarding action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: true,
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: aBoolean(),
            };
            const newStore = reducer(oldStore, setOnboarding());
            expect(newStore.showOnboarding).toBe(false);
        });

        test('is loaded from persisted data', () => {
            const onboardingFlag = aBoolean();
            const oldStore: UserProfileStore = {
                showOnboarding: onboardingFlag,
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: aBoolean(),
            };
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowOnboarding(!onboardingFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);

            const newStore = reducer(oldStore, actionFlippingFlag);

            expect(newStore.showOnboarding).toBe(!onboardingFlag);
        });

        test('is set by clean all user data action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: false,
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: aBoolean(),
            };
            const newStore = reducer(oldStore, clearAllUserData());

            expect(newStore.showOnboarding).toBe(true);
        });
    });

    describe('the disable analytics flag', () => {

        test('is set by the disable analytics action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: false,
                showPartialLocalizationMessage: aBoolean(),
            };
            const newStore = reducer(oldStore, disableAnalytics(true));
            expect(newStore.disableAnalytics).toBe(true);
        });

        test('is set by the disable analytics action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: true,
                showPartialLocalizationMessage: aBoolean(),
            };
            const newStore = reducer(oldStore, disableAnalytics(false));
            expect(newStore.disableAnalytics).toBe(false);

        });

        test('is loaded from persisted data', () => {
            const disableAnalyticsFlag = aBoolean();
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: disableAnalyticsFlag,
                showPartialLocalizationMessage: aBoolean(),
            };
            const dataFlippingFlag = new PersistedDataBuilder().
                withDisableAnalytics(!disableAnalyticsFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);

            const newStore = reducer(oldStore, actionFlippingFlag);

            expect(newStore.disableAnalytics).toBe(!disableAnalyticsFlag);
        });

        test('is cleared by clean all user data action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: true,
                showPartialLocalizationMessage: aBoolean(),
            };
            const newStore = reducer(oldStore, clearAllUserData());

            expect(newStore.disableAnalytics).toBe(false);
        });
    });

    describe('the showPartialLocalizationMessage flag', () => {

        test('is cleared by the set partial localization message action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: true,
            };
            const newStore = reducer(oldStore, setShowPartialLocalizationMessage());
            expect(newStore.showPartialLocalizationMessage).toBe(false);
        });

        test('is loaded from persisted data' , () => {
            const partialLocalizationMessageFlag = aBoolean();
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: partialLocalizationMessageFlag,
            };
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowPartialLocalizationMessage(!partialLocalizationMessageFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);
            const newStore = reducer(oldStore, actionFlippingFlag);
            expect(newStore.showPartialLocalizationMessage).toBe(!partialLocalizationMessageFlag);
        });

        test('is cleared by clean all user data action', () => {
            const oldStore: UserProfileStore = {
                showOnboarding: aBoolean(),
                disableAnalytics: aBoolean(),
                showPartialLocalizationMessage: false,
            };
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.showPartialLocalizationMessage).toBe(true);
        });
    });
});