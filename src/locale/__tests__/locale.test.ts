// tslint:disable:no-expression-statement
import { LocaleInfoManager } from '../';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { LocaleInfoBuilder } from '../../stores/__tests__/helpers/locale_helpers';

describe('LocaleManager', () => {

    describe('before .registerLocales() is called', () => {

        it('.get() should throw an error', () => {
            expect(() => LocaleInfoManager.get(aString())).toThrow();
        });

        it('.getFallback() should throw an error', () => {
            expect(() => LocaleInfoManager.getFallback()).toThrow();
        });

        it('.all should throw an error', () => {
            expect(() => LocaleInfoManager.all).toThrow();
        });

        it('.catalogsMap should throw an error', () => {
            expect(() => LocaleInfoManager.catalogsMap).toThrow();
        });

    });

    describe('.registerLocales()', () => {

        const aLocale = { ...new LocaleInfoBuilder().build(), catalog: {} };

        afterEach(() => {
            LocaleInfoManager.reset();
        });

        it('should return the LocaleManager', () => {
            expect(LocaleInfoManager.registerSingle(aLocale)).toBe(LocaleInfoManager);
        });

        it('should throw an error if called twice', () => {
            expect(LocaleInfoManager.registerSingle(aLocale)).toBe(LocaleInfoManager);
            expect(() => LocaleInfoManager.registerSingle(aLocale)).toThrow();
        });

    });

    describe('with locales registered', () => {

        const aLocale = new LocaleInfoBuilder().build();
        const aCatalog = {};

        beforeAll(() => {
            LocaleInfoManager.registerSingle({ ...aLocale, catalog: aCatalog });
        });

        it('.get() should return a locale when given a known locale code', () => {
            expect(LocaleInfoManager.get(aLocale.code)).toEqual(aLocale);
        });

        it('.get() should throw an error if given an unknown locale code', () => {
            expect(() => LocaleInfoManager.get(aString())).toThrow();
        });

        it('.getFallback() should return the first registered locale', () => {
            expect(LocaleInfoManager.getFallback()).toEqual(aLocale);
        });

        it('.all should be an array of the known locales', () => {
            expect(LocaleInfoManager.all).toEqual([aLocale]);
        });

        it('.catalogsMap should be a map of the known locale catalogs keyed by locale code', () => {
            expect(LocaleInfoManager.catalogsMap).toEqual({ [aLocale.code]: aCatalog });
        });

    });

});
