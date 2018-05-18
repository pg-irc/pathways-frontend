// tslint:disable:no-expression-statement

import * as fonts from '../fonts';
import * as constants from '../../application/constants';

const someFonts = {
    MyFont: {},
};

const buildStoreLoading = (): fonts.Store => {
    return { ...fonts.buildDefaultStore(), loading: true };
};

describe('the setLocaleAction for', () => {

    describe('request', () => {

        it('should create action with type LOAD_FONTS_REQUEST', () => {
            const theLoadFontsAction = fonts.loadFontsActions.request(someFonts);
            expect(theLoadFontsAction.type).toBe(constants.LOAD_FONTS_REQUEST);
        });

        it('should create action with payload containing the locale', () => {
            const theLoadFontsAction = fonts.loadFontsActions.request(someFonts);
            expect(theLoadFontsAction.payload.fonts).toBe(someFonts);
        });

    });

    describe('success', () => {

        it('should create action with type LOAD_FONTS_SUCCESS', () => {
            const theLoadFontsAction = fonts.loadFontsActions.success(someFonts);
            expect(theLoadFontsAction.type).toBe(constants.LOAD_FONTS_SUCCESS);
        });

        it('should create action with payload containing the locale', () => {
            const theLoadFontsAction = fonts.loadFontsActions.success(someFonts);
            expect(theLoadFontsAction.payload.fonts).toBe(someFonts);
        });

    });

    describe('failure', () => {

        const errorMessage = '[test] Error occurred during loadFonts';

        it('should create action with type LOAD_FONTS_FAILURE', () => {
            const theLoadFontsAction = fonts.loadFontsActions.failure(errorMessage, someFonts);
            expect(theLoadFontsAction.type).toBe(constants.LOAD_FONTS_FAILURE);
        });

        it('should create action with payload containing an error message and the fonts', () => {
            const theLoadFontsAction = fonts.loadFontsActions.failure(errorMessage, someFonts);
            expect(theLoadFontsAction.payload.message).toBe(errorMessage);
            expect(theLoadFontsAction.payload.fonts).toBe(someFonts);
        });

    });

});

describe('the reducer', () => {

    it('should default to build a store with default loading state set to false', () => {
        const theStore = fonts.reducer();
        expect(theStore.loading).toBe(false);
    });

    it('when called with LOAD_FONTS_REQUEST should return store with loading flag set to true', () => {
        const theStore = fonts.buildDefaultStore();
        const theAction = {
            type: constants.LOAD_FONTS_REQUEST as typeof constants.LOAD_FONTS_REQUEST,
            payload: { fonts: someFonts },
        };
        const theNewStore = fonts.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(true);
    });

    it('when called with LOAD_FONTS_SUCCESS should return store with loading flag set to false', () => {
        const theStore = buildStoreLoading();
        const theAction = {
            type: constants.LOAD_FONTS_SUCCESS as typeof constants.LOAD_FONTS_SUCCESS,
            payload: { fonts: someFonts },
        };
        const theNewStore = fonts.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(false);
    });

    it('when called with LOAD_FONTS_FAILURE should return store with loading flag set false', () => {
        const errorMessage = '[test] Error occurred during loadFonts';
        const theStore = buildStoreLoading();
        const theAction = {
            type: constants.LOAD_FONTS_FAILURE as typeof constants.LOAD_FONTS_FAILURE,
            payload: { message: errorMessage, fonts: someFonts },
        };
        const theNewStore = fonts.reducer(theStore, theAction);
        expect(theNewStore.loading).toBe(false);
    });

    it('should return store unchanged if action is undefined', () => {
        const theOriginalStore = buildStoreLoading();
        const theNewStore = fonts.reducer(theOriginalStore, undefined);
        expect(theNewStore.loading).toBe(theOriginalStore.loading);
    });

});