// tslint:disable:no-expression-statement
import { reducer, hideOnboarding, disableAnalytics, hidePartialLocalizationMessage, hideLinkAlerts, enableCustomLatLong, saveRegion } from '../user_profile';
import { aBoolean, aLatLong } from '../../application/helpers/random_test_values';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { DataPersistence } from '../persisted_data';
import { clearAllUserData } from '../questionnaire/actions';
import { UserProfileBuilder } from './helpers/user_profile_builder';
import { RegionCode } from '../../validation/region/types';

describe('user profile reducer', () => {

    describe('the region code', () => {

        test('is undefined by default', () => {
            const store = new UserProfileBuilder().build();
            expect(store.region).toBe(undefined);
        });

        test('is changed when a region is set from scratch', () => {
            const newRegion = RegionCode.BC;
            const oldStore = new UserProfileBuilder().build();
            const newStore = reducer(oldStore, saveRegion(newRegion));
            expect(newStore.region).toBe(newRegion);
        });

        test('is changed when switching between region', () => {
            const oldRegion = RegionCode.BC;
            const newRegion = RegionCode.MB;
            const oldStore = new UserProfileBuilder().withRegion(oldRegion);
            const newStore = reducer(oldStore, saveRegion(newRegion));
            expect(newStore.region).toBe(newRegion);
        });

        test('is loaded from persisted data', () => {
            const oldStoreWithBC = new UserProfileBuilder().withRegion(RegionCode.BC).build();
            const persistedDataWithMB = new PersistedDataBuilder().
                withRegion(RegionCode.MB).
                build();
            const loadSuccessActionWithMB = DataPersistence.loadSuccess(persistedDataWithMB);
            const newStore = reducer(oldStoreWithBC, loadSuccessActionWithMB);
            expect(newStore.region).toBe(RegionCode.MB);
        });

        test('is set to BC by the clear all user data action', () => {
            const oldStore = new UserProfileBuilder().withRegion(RegionCode.BC).build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.region).toBe(RegionCode.BC);
        });
    });

    describe('the onboarding flag', () => {

        test('is cleared by the hide onboarding action', () => {
            const oldStore = new UserProfileBuilder().build();
            const newStore = reducer(oldStore, hideOnboarding());
            expect(newStore.showOnboarding).toBe(false);
        });

        test('is loaded from persisted data', () => {
            const onboardingFlag = aBoolean();
            const oldStore = new UserProfileBuilder().withShowOnboarding(onboardingFlag).build();
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowOnboarding(!onboardingFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);
            const newStore = reducer(oldStore, actionFlippingFlag);
            expect(newStore.showOnboarding).toBe(!onboardingFlag);
        });

        test('is set by clear all user data action', () => {
            const oldStore = new UserProfileBuilder().withShowOnboarding(false).build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.showOnboarding).toBe(true);
        });
    });

    describe('the disable analytics flag', () => {

        test('is set by the disable analytics action', () => {
            const oldStore = new UserProfileBuilder().withDisableAnalytics(false).build();
            const newStore = reducer(oldStore, disableAnalytics(true));
            expect(newStore.disableAnalytics).toBe(true);
        });

        test('is set by the disable analytics action', () => {
            const oldStore = new UserProfileBuilder().withDisableAnalytics(true).build();
            const newStore = reducer(oldStore, disableAnalytics(false));
            expect(newStore.disableAnalytics).toBe(false);

        });

        test('is loaded from persisted data', () => {
            const disableAnalyticsFlag = aBoolean();
            const oldStore = new UserProfileBuilder().withDisableAnalytics(disableAnalyticsFlag).build();
            const dataFlippingFlag = new PersistedDataBuilder().
                withDisableAnalytics(!disableAnalyticsFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);
            const newStore = reducer(oldStore, actionFlippingFlag);
            expect(newStore.disableAnalytics).toBe(!disableAnalyticsFlag);
        });

        test('is cleared by clear all user data action', () => {
            const oldStore = new UserProfileBuilder().withDisableAnalytics(true).build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.disableAnalytics).toBe(false);
        });
    });

    describe('the custom latlong', () => {

        test('is set by the enable custom latlong action', () => {
            const newLatLong = aLatLong();
            const oldStore = new UserProfileBuilder().withCustomLatLong(undefined).build();
            const newStore = reducer(oldStore, enableCustomLatLong(newLatLong));
            expect(newStore.customLatLong).toBe(newLatLong);
        });

        test('is replaced by the enable custom latlong action', () => {
            const newLatLong = aLatLong();
            const oldStoreWithCustomLatLong = new UserProfileBuilder().build();
            const newStore = reducer(oldStoreWithCustomLatLong, enableCustomLatLong(newLatLong));
            expect(newStore.customLatLong).toBe(newLatLong);

        });

        test('is loaded from persisted data', () => {
            const savedCustomLatLong = aLatLong();
            const oldStore = new UserProfileBuilder().withCustomLatLong(savedCustomLatLong).build();
            const dataCustomLatLong = new PersistedDataBuilder().
                withCustomLatLong(savedCustomLatLong).
                build();
            const actionCustomizeLatLong = DataPersistence.loadSuccess(dataCustomLatLong);
            const newStore = reducer(oldStore, actionCustomizeLatLong);
            expect(newStore.customLatLong).toBe(savedCustomLatLong);
        });

        test('is cleared by clear all user data action', () => {
            const oldStore = new UserProfileBuilder().build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.customLatLong).toBe(undefined);
        });
    });

    describe('the showPartialLocalizationMessage flag', () => {

        test('is cleared by the sewt partial localization message action', () => {
            const oldStore = new UserProfileBuilder().withShowPartialLocalizationMessage(true).build();
            const newStore = reducer(oldStore, hidePartialLocalizationMessage());
            expect(newStore.showPartialLocalizationMessage).toBe(false);
        });

        test('is loaded from persisted data', () => {
            const partialLocalizationMessageFlag = aBoolean();
            const oldStore = new UserProfileBuilder().withShowPartialLocalizationMessage(partialLocalizationMessageFlag).build();
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowPartialLocalizationMessage(!partialLocalizationMessageFlag).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);
            const newStore = reducer(oldStore, actionFlippingFlag);
            expect(newStore.showPartialLocalizationMessage).toBe(!partialLocalizationMessageFlag);
        });

        test('is cleared by clear all user data action', () => {
            const oldStore = new UserProfileBuilder().withShowPartialLocalizationMessage(false).build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.showPartialLocalizationMessage).toBe(true);
        });
    });

    describe('the link alert flag', () => {

        test('is cleared by the hide link alerts action', () => {
            const oldStore = new UserProfileBuilder().withShowOnboarding(true).build();
            const newStore = reducer(oldStore, hideLinkAlerts());
            expect(newStore.showLinkAlerts).toBe(false);
        });

        test('is loaded from persisted data', () => {
            const showLinkAlerts = aBoolean();
            const oldStore = new UserProfileBuilder().withShowLinkAlerts(showLinkAlerts).build();
            const dataFlippingFlag = new PersistedDataBuilder().
                withShowLinkAlerts(!showLinkAlerts).
                build();
            const actionFlippingFlag = DataPersistence.loadSuccess(dataFlippingFlag);
            const newStore = reducer(oldStore, actionFlippingFlag);
            expect(newStore.showLinkAlerts).toBe(!showLinkAlerts);
        });

        test('is set by clear all user data action', () => {
            const oldStore = new UserProfileBuilder().withShowLinkAlerts(false).build();
            const newStore = reducer(oldStore, clearAllUserData());
            expect(newStore.showLinkAlerts).toBe(true);
        });
    });
});
