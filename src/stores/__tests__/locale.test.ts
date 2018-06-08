// tslint:disable:no-expression-statement
import * as locale from '../locale';
import * as constants from '../../application/constants';
import { aString } from '../../application/__tests__/helpers/random_test_values';

const aLocaleCode = aString();

const buildStoreWithLocale = (theLocaleCode: string): locale.Store => {
    return { availableLocales: [], code: theLocaleCode, fallback: theLocaleCode, errorMessage: '', loading: false };
};

const buildStoreLoadingLocale = (): locale.Store => {
    return { availableLocales: [], code: aLocaleCode, fallback: aLocaleCode, errorMessage: '', loading: true };
};

describe('the setLocaleAction for', () => {

    describe('request', () => {

        it('should create action with type SET_LOCALE_REQUEST', () => {
            const theSetLangAction = locale.setLocaleActions.request(aLocaleCode);
            expect(theSetLangAction.type).toBe(constants.SET_LOCALE_REQUEST);
        });

        it('should create action with payload containing the locale code', () => {
            const theSetLangAction = locale.setLocaleActions.request(aLocaleCode);
            expect(theSetLangAction.payload.localeCode).toBe(aLocaleCode);
        });

    });

    describe('success', () => {

        it('should create action with type SET_LOCALE_SUCCESS', () => {
            const theSetLangAction = locale.setLocaleActions.success(aLocaleCode);
            expect(theSetLangAction.type).toBe(constants.SET_LOCALE_SUCCESS);
        });

        it('should create action with payload containing the locale code', () => {
            const theSetLangAction = locale.setLocaleActions.success(aLocaleCode);
            expect(theSetLangAction.payload.localeCode).toBe(aLocaleCode);
        });

    });

    describe('failure', () => {

        const errorMessage = '[test] Error occurred during setLocale';

        it('should create action with type SET_LOCALE_FAILURE', () => {
            const theSetLangAction = locale.setLocaleActions.failure(errorMessage, aLocaleCode);
            expect(theSetLangAction.type).toBe(constants.SET_LOCALE_FAILURE);
        });

        it('should create action with payload containing an error message and the locale code', () => {
            const theSetLangAction = locale.setLocaleActions.failure(errorMessage, aLocaleCode);
            expect(theSetLangAction.payload.message).toBe(errorMessage);
            expect(theSetLangAction.payload.localeCode).toBe(aLocaleCode);
        });

    });

});

describe('the loadCurrentLocaleAction for', () => {

    describe('request', () => {

        it('should create action with type LOAD_CURRENT_LOCALE_REQUEST', () => {
            const theLoadCurrentLocaleAction = locale.loadCurrentLocaleActions.request();
            expect(theLoadCurrentLocaleAction.type).toBe(constants.LOAD_CURRENT_LOCALE_REQUEST);
        });

    });

    describe('success', () => {

        it('should create action with type LOAD_CURRENT_LOCALE_REQUEST', () => {
            const theLoadCurrentLocaleAction = locale.loadCurrentLocaleActions.success(aLocaleCode);
            expect(theLoadCurrentLocaleAction.type).toBe(constants.LOAD_CURRENT_LOCALE_SUCCESS);
        });

        it('should create action with payload containing the locale', () => {
            const theLoadCurrentLocaleAction = locale.loadCurrentLocaleActions.success(aLocaleCode);
            expect(theLoadCurrentLocaleAction.payload.localeCode).toBe(aLocaleCode);
        });

    });

    describe('failure', () => {

        const errorMessage = '[test] Error occurred during loadCurrentLocale';

        it('should create action with type SET_LOCALE_FAILURE', () => {
            const theLoadCurrentLocaleAction = locale.loadCurrentLocaleActions.failure(errorMessage);
            expect(theLoadCurrentLocaleAction.type).toBe(constants.LOAD_CURRENT_LOCALE_FAILURE);
        });

        it('should create action with payload containing an error message', () => {
            const theLoadCurrentLocaleAction = locale.loadCurrentLocaleActions.failure(errorMessage);
            expect(theLoadCurrentLocaleAction.payload.message).toBe(errorMessage);
        });

    });

});

describe('the reducer', () => {

    it('should return store unchanged if action is undefined', () => {
        const theOriginalStore = buildStoreWithLocale(aLocaleCode);
        const theNewStore = locale.reducer(theOriginalStore, undefined);
        expect(theNewStore).toBe(theOriginalStore);
    });

    it('should default to build a store with a undefined locale code', () => {
        const theStore = locale.reducer();
        expect(theStore.code).toBe(undefined);
    });

    it('should default to build a store with a undefined fallback locale code', () => {
        const theStore = locale.reducer();
        expect(theStore.fallback).toBe(undefined);
    });

    it('when called with SET_LOCALE_REQUEST should return store with loading flag set', () => {
        const theStore = locale.buildDefaultStore();
        const theAction = {
            type: constants.SET_LOCALE_REQUEST as typeof constants.SET_LOCALE_REQUEST,
            payload: { localeCode: aLocaleCode },
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(true);
    });

    it('when called with SET_LOCALE_SUCCESS should return store with locale code from action', () => {
        const theStore = buildStoreLoadingLocale();
        const theAction = {
            type: constants.SET_LOCALE_SUCCESS as typeof constants.SET_LOCALE_SUCCESS,
            payload: { localeCode: aLocaleCode },
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.code).toBe(theAction.payload.localeCode);
        expect(theNewStore.loading).toBe(false);
    });

    it('when called with SET_LOCALE_FAILURE should return store with loading flag set false', () => {
        const errorMessage = aString();
        const theStore = buildStoreLoadingLocale();
        const theAction = {
            type: constants.SET_LOCALE_FAILURE as typeof constants.SET_LOCALE_FAILURE,
            payload: { message: errorMessage, localeCode: aLocaleCode },
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(false);
    });

    it('when called with LOAD_CURRENT_LOCALE_REQUEST should return store with loading flag set', () => {
        const theStore = locale.buildDefaultStore();
        const theAction = {
            type: constants.LOAD_CURRENT_LOCALE_REQUEST as typeof constants.LOAD_CURRENT_LOCALE_REQUEST,
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(true);
    });

    it('when called with LOAD_CURRENTLOCALE_SUCCESS should return store with locale code from action', () => {
        const theStore = buildStoreLoadingLocale();
        const theAction = {
            type: constants.LOAD_CURRENT_LOCALE_SUCCESS as typeof constants.LOAD_CURRENT_LOCALE_SUCCESS,
            payload: { localeCode: aLocaleCode },
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.code).toBe(theAction.payload.localeCode);
        expect(theNewStore.loading).toBe(false);
    });

    it('when called with LOAD_CURERNT_LOCALE_FAILURE should return store with loading flag set false', () => {
        const errorMessage = aString();
        const theStore = buildStoreLoadingLocale();
        const theAction = {
            type: constants.LOAD_CURRENT_LOCALE_FAILURE as typeof constants.LOAD_CURRENT_LOCALE_FAILURE,
            payload: { message: errorMessage, localeCode: aLocaleCode },
        };
        const theNewStore = locale.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(false);
    });

});
