// tslint:disable:no-expression-statement no-let no-null-keyword no-any
import { call, put, PutEffect, CallEffect } from 'redux-saga/effects';

import { LocaleInfoBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { loadCurrentLocaleCode, saveCurrentLocaleCode, LocaleInfoManager } from '../../locale';
import * as actions from '../../stores/locale/actions';
import { applyLocaleChange, loadCurrentLocale } from '../locale';
import { anError, aBoolean } from '../../application/helpers/random_test_values';
import { loadIsRTLBoolean } from '../../locale/effects';

describe('load locale saga', () => {
    const theFallbackLocale = new LocaleInfoBuilder().build();
    const aLocale = new LocaleInfoBuilder().build();
    const isRTLFromStorage = aBoolean();
    beforeAll(() => {
        LocaleInfoManager.register(
            [
                { ...theFallbackLocale, catalog: {} },
                { ...aLocale, catalog: {} },
            ],
        );
    });

    describe('with locale already saved', () => {
        let loadCurrentLocaleAction: any = undefined;
        let loadIsRTL: any = undefined;
        let loadSuccessAction: any = undefined;

        beforeEach(() => {
            const saga: any = loadCurrentLocale();
            loadCurrentLocaleAction = saga.next().value;
            const valueFromStorage: string = aLocale.code;
            loadIsRTL = saga.next(valueFromStorage).value;
            loadSuccessAction = saga.next(isRTLFromStorage).value;
        });

        it('dispatches a load current locale action', () => {
            expect(loadCurrentLocaleAction).toEqual(call(loadCurrentLocaleCode));
        });

        it('calls a load is RTL function', () => {
            expect(loadIsRTL).toEqual(call(loadIsRTLBoolean));
        });

        it('dispatches a load current locale success action with isSaved flag is true', () => {
            const isSaved = true;
            const flipOrientation = isRTLFromStorage;
            expect(loadSuccessAction).toEqual(put(actions.loadLocaleSuccess(aLocale.code, isSaved, flipOrientation, isRTLFromStorage)));
        });
    });

    describe('with locale not saved', () => {
        let saga: any = undefined;
        let loadCurrentLocaleAction: any = undefined;
        let saveCurrentLocaleCodeAction: any = undefined;
        let loadSuccessActionWithFallbackLocale: any = undefined;
        let loadIsRTL: any = undefined;

        beforeEach(() => {
            saga = loadCurrentLocale();
            loadCurrentLocaleAction = saga.next().value;
            const emptyValueFromStorage: string = null;
            loadIsRTL = saga.next(emptyValueFromStorage).value;
            saveCurrentLocaleCodeAction = saga.next(isRTLFromStorage).value;
            loadSuccessActionWithFallbackLocale = saga.next(null).value;
        });

        it('dispatches a load current locale action', () => {
            expect(loadCurrentLocaleAction).toEqual(call(loadCurrentLocaleCode));
        });

        it('calls a load is RTL function', () => {
            expect(loadIsRTL).toEqual(call(loadIsRTLBoolean));
        });

        it('dispatches action to save the fallback locale as the current locale', () => {
            expect(saveCurrentLocaleCodeAction).toEqual(call(saveCurrentLocaleCode, theFallbackLocale.code));
        });

        it('dispatches a load current locale success action with isSaved flag is false', () => {
            const isSaved = false;
            const flipOrientation = isRTLFromStorage;
            expect(loadSuccessActionWithFallbackLocale)
                .toEqual(put(actions.loadLocaleSuccess(theFallbackLocale.code, isSaved, flipOrientation, isRTLFromStorage)));
        });
    });
});

describe('the applyLocaleChange saga', () => {

    const aLocale = new LocaleInfoBuilder().build();
    const flipOrientation = aBoolean();
    const isRTL = aBoolean();
    const saveLocaleAction = actions.saveLocaleRequest(aLocale.code, flipOrientation, isRTL);

    it('should dispatch a call effect with saveCurrentLocale', () => {
        const saga = applyLocaleChange(saveLocaleAction);
        expect(saga.next().value).toEqual(call(saveCurrentLocaleCode, aLocale.code));
    });

    describe('after requesting the current locale be saved', () => {

        let saga: IterableIterator<CallEffect | PutEffect<actions.SaveLocaleResult>>;

        beforeEach(() => {
            LocaleInfoManager.reset();
            LocaleInfoManager.registerSingle({ ...aLocale, catalog: {} });
            saga = applyLocaleChange(saveLocaleAction);
            saga.next();
        });

        it('should dispatch a put effect with a success action upon completion of call effect', () => {
            expect(saga.next().value).toEqual(put(actions.saveLocaleSuccess(aLocale.code, flipOrientation, isRTL)));
        });

        it('should dispatch a failure action upon failure of call effect', () => {
            const error = anError();
            const value = saga.throw(error).value;
            expect(value).toEqual(put(actions.saveLocaleFailure(error.message, aLocale.code)));
        });

    });
});
