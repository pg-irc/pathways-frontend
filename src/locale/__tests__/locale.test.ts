// tslint:disable:no-expression-statement
import { LocaleDefinitionManager } from '../';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { LocaleDefinitionBuilder } from '../../stores/__tests__/helpers/locale_helpers';

describe('LocaleManager', () => {

    describe('before .registerLocales() is called', () => {

        it('.get() should throw an error', () => {
            expect(() => LocaleDefinitionManager.get(aString())).toThrow();
        });

        it('.getFallback() should throw an error', () => {
            expect(() => LocaleDefinitionManager.getFallback()).toThrow();
        });

        it('.all should throw an error', () => {
            expect(() => LocaleDefinitionManager.all).toThrow();
        });

        it('.catalogsMap should throw an error', () => {
            expect(() => LocaleDefinitionManager.catalogsMap).toThrow();
        });

    });

    describe('.registerLocales()', () => {

        const aLocale = new LocaleDefinitionBuilder().build();

        afterEach(() => {
            LocaleDefinitionManager.reset();
        });

        it('should return the LocaleManager', () => {
            expect(LocaleDefinitionManager.registerSingle(aLocale)).toBe(LocaleDefinitionManager);
        });

        it('should throw an error if called twice', () => {
            expect(LocaleDefinitionManager.registerSingle(aLocale)).toBe(LocaleDefinitionManager);
            expect(() => LocaleDefinitionManager.registerSingle(aLocale)).toThrow();
        });

    });

    describe('with locales registered', () => {

        const aLocale = new LocaleDefinitionBuilder().build();

        beforeAll(() => {
            LocaleDefinitionManager.registerSingle(aLocale);
        });

        it('.get() should return a locale when given a known locale code', () => {
            expect(LocaleDefinitionManager.get(aLocale.code)).toBe(aLocale);
        });

        it('.get() should throw an error if given an unknown locale code', () => {
            expect(() => LocaleDefinitionManager.get(aString())).toThrow();
        });

        it('.getFallback() should return the first registered locale', () => {
            expect(LocaleDefinitionManager.getFallback()).toBe(aLocale);
        });

        it('.all should be an array of the known locales', () => {
            expect(LocaleDefinitionManager.all).toEqual([aLocale]);
        });

        it('.catalogsMap should be a map of the known locale catalogs keyed by locale code', () => {
            expect(LocaleDefinitionManager.catalogsMap).toEqual({ [aLocale.code]: aLocale.catalog });
        });

    });

});
