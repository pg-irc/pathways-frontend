// tslint:disable:no-expression-statement no-let no-null-keyword no-any
import { call, put, PutEffect, CallEffect } from 'redux-saga/effects';

import { LocaleInfoBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { loadCurrentLocaleCode, saveCurrentLocaleCode, reload, needsTextDirectionChange, setTextDirection, LocaleInfoManager } from '../../locale';
import { loadCurrentLocaleActions, setLocaleActions, SetLocale } from '../../stores/locale';
import { applyLocaleChange, loadCurrentLocale } from '../locale';
import { anError } from '../../application/__tests__/helpers/random_test_values';

describe('load locale saga', () => {
    const theFallbackLocale = new LocaleInfoBuilder().build();
    const aLocale = new LocaleInfoBuilder().build();
    beforeAll(() => {
        LocaleInfoManager.register(
            [
                { ...theFallbackLocale, catalog: {} },
                { ...aLocale, catalog: {} },
            ],
        );
    });

    describe('with locale already set', () => {
        let loadCurrentLocaleAction: any = undefined;
        let loadSuccessAction: any = undefined;

        beforeEach(() => {
            const saga = loadCurrentLocale();
            loadCurrentLocaleAction = saga.next().value;
            const valueFromStorage: string = aLocale.code;
            loadSuccessAction = saga.next(valueFromStorage).value;
        });

        it('dispatches a load current locale action', () => {
            expect(loadCurrentLocaleAction).toEqual(call(loadCurrentLocaleCode));
        });

        it('dispatches a load current locale success action with isSet flag is true', () => {
            const isSet = true;
            const loading = false; 
            const message = '';
            expect(loadSuccessAction).toEqual(put(loadCurrentLocaleActions.success(message, loading, aLocale.code, isSet)));
        });
    });

    describe('with locale not set', () => {
        let saga: any = undefined;
        let loadCurrentLocaleAction: any = undefined;
        let saveCurrentLocaleCodeAction: any = undefined;
        let loadSuccessActionWithFallbackLocale: any = undefined;

        beforeEach(() => {
            saga = loadCurrentLocale();
            loadCurrentLocaleAction = saga.next().value;
            const emptyValueFromStorage: string = null;
            saveCurrentLocaleCodeAction = saga.next(emptyValueFromStorage).value;
            loadSuccessActionWithFallbackLocale = saga.next(null).value;
        });

        it('dispatches a load current locale action', () => {
            expect(loadCurrentLocaleAction).toEqual(call(loadCurrentLocaleCode));
        });

        it('dispatches action to save the fallback locale as the current locale', () => {
            expect(saveCurrentLocaleCodeAction).toEqual(call(saveCurrentLocaleCode, theFallbackLocale.code));
        });

        it('dispatches a load current locale success action with isSet flag is false', () => {
            const isSet = false;
            const loading = false; 
            const message = '';
            expect(loadSuccessActionWithFallbackLocale).toEqual(put(loadCurrentLocaleActions.success(message, loading, theFallbackLocale.code, isSet)));
        });
    });
});

describe('the applyLocaleChange saga', () => {

    const aLocale = new LocaleInfoBuilder().build();
    const setLocaleAction = setLocaleActions.request(aLocale.code);

    it('should dispatch a call effect with saveCurrentLocale', () => {
        const saga = applyLocaleChange(setLocaleAction);
        expect(saga.next().value).toEqual(call(saveCurrentLocaleCode, aLocale.code));
    });

    describe('after requesting the current locale be saved', () => {

        let saga: IterableIterator<CallEffect | PutEffect<SetLocale.Result>>;

        beforeEach(() => {
            LocaleInfoManager.reset();
            LocaleInfoManager.registerSingle({ ...aLocale, catalog: {} });
            saga = applyLocaleChange(setLocaleAction);
            saga.next();
        });

        it('should dispatch a put effect with a success action upon completion of call effect', () => {
            const loading = false; 
            const message = '';
            expect(saga.next().value).toEqual(put(setLocaleActions.success(message, loading,aLocale.code)));
            expect(saga.next().value).toEqual(call(needsTextDirectionChange, aLocale.code));
            expect(saga.next(true).value).toEqual(call(setTextDirection, aLocale.code));
            expect(saga.next().value).toEqual(call(reload));
        });

        it('should dispatch a failure action upon failure of call effect', () => {
            const error = anError();
            const value = saga.throw(error).value;
            const loading = false; 
            expect(value).toEqual(put(setLocaleActions.failure(error.message, loading, aLocale.code)));
        });

    });
});
