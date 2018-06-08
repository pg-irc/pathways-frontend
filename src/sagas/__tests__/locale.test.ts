// tslint:disable:no-expression-statement no-let no-null-keyword
import { call, put, PutEffect, CallEffect } from 'redux-saga/effects';

import { LocaleInfoBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { loadCurrentLocaleCode, saveCurrentLocaleCode, reload, setTextDirection, LocaleInfoManager } from '../../locale';
import { loadCurrentLocaleActions, setLocaleActions, SetLocale } from '../../stores/locale';
import { applyLocaleChange, loadCurrentLocale, LoadCurrentLocaleActions } from '../locale';
import { anError } from '../../application/__tests__/helpers/random_test_values';

describe('the loadCurrentLocale saga', () => {

    const aLocale = new LocaleInfoBuilder().build();

    beforeAll(() => {
        LocaleInfoManager.registerSingle({ ...aLocale, catalog: {} });
    });

    it('should dispatch a call effect for loadCurrentLocaleCode()', () => {
        const saga = loadCurrentLocale();
        const value = saga.next().value;
        expect(value).toEqual(call(loadCurrentLocaleCode));
    });

    describe('after requesting the current locale code should', () => {

        let saga: IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>>;

        beforeEach(() => {
            saga = loadCurrentLocale();
            saga.next();
        });

        it('dispatch a success action with the received locale code', () => {
            const value = saga.next(aLocale.code).value;
            expect(value).toEqual(put(loadCurrentLocaleActions.success(aLocale.code)));
        });

        it('dispatch a success action with the fallback locale code if no current locale is set', () => {
            const value = saga.next(null).value;
            expect(value).toEqual(put(loadCurrentLocaleActions.success(aLocale.code)));
        });

        it('dispatch a failure action upon failure to load a locale code', () => {
            const error = anError();
            const value = saga.throw(error).value;
            expect(value).toEqual(put(loadCurrentLocaleActions.failure(error.message)));
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
            LocaleInfoManager.reset().registerSingle({ ...aLocale, catalog: {} });
            saga = applyLocaleChange(setLocaleAction);
            saga.next();
        });

        it('should dispatch a put effect with a success action upon completion of call effect', () => {
            expect(saga.next().value).toEqual(put(setLocaleActions.success(aLocale.code)));
            expect(saga.next().value).toEqual(call(setTextDirection, aLocale.code));
            expect(saga.next(true).value).toEqual(call(reload));
        });

        it('should dispatch a failure action upon failure of call effect', () => {
            const error = anError();
            const value = saga.throw(error).value;
            expect(value).toEqual(put(setLocaleActions.failure(error.message, aLocale.code)));
        });

    });

});
