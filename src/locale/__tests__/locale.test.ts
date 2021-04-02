// tslint:disable:no-expression-statement
import { LocaleInfoManager } from '..';
import { aString } from '../../application/helpers/random_test_values';
import { LocaleInfoBuilder, LocaleInfoWithCatalogBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { LocaleInfo, CatalogsMap } from '../types';

describe('LocaleManager', () => {

    describe('before .registerLocales() is called', () => {

        beforeEach(() => LocaleInfoManager.reset());

        it('.get() should throw an error', () => {
            expect(() => LocaleInfoManager.get(aString())).toThrow();
        });

        it('.getFallback() should throw an error', () => {
            expect(() => LocaleInfoManager.getFallback()).toThrow();
        });

        it('.all should throw an error', () => {
            expect(() => LocaleInfoManager.all()).toThrow();
        });

        it('.catalogsMap should throw an error', () => {
            expect(() => LocaleInfoManager.catalogsMap()).toThrow();
        });

    });

    describe('register locale info', () => {
        const code = aString();
        const label = aString();
        const aLocale = new LocaleInfoWithCatalogBuilder().withCode(code).withLabel(label).build();
        LocaleInfoManager.register([aLocale]);
        const result = LocaleInfoManager.get(code);
        expect(result.code).toEqual(code);
        expect(result.label).toEqual(label);
    })

    describe('.registerLocales()', () => {

        const aLocale = { ...new LocaleInfoBuilder().build(), catalog: {} };

        afterEach(() => {
            LocaleInfoManager.reset();
        });

        it('should throw an error if called twice', () => {
            LocaleInfoManager.register([aLocale]);
            expect(() => LocaleInfoManager.register([aLocale])).toThrow();
        });

    });

    describe('with locales registered', () => {

        const localeCodes: ReadonlyArray<string> = ['en', 'ar', 'zh'];
        const availableLocales: ReadonlyArray<LocaleInfo> = localeCodes.map((localeCode: string) => (
            new LocaleInfoBuilder().withCode(localeCode).build()
        ));

        const aCatalog = {};

        beforeAll(() => {
            LocaleInfoManager.register(availableLocales.map((locale: LocaleInfo) => ({
                ...locale, catalog: aCatalog,
            })));
        });

        it('.get() should return a locale when given a known locale code', () => {
            const aLocale = availableLocales[availableLocales.length - 1];
            expect(LocaleInfoManager.get(aLocale.code)).toEqual(aLocale);
        });

        it('.get() should throw an error if given an unknown locale code', () => {
            expect(() => LocaleInfoManager.get(aString())).toThrow();
        });

        it('the default fallback locale should be the first locale registered', () => {
            expect(LocaleInfoManager.getFallback()).toEqual(availableLocales[0]);
        });

        it('.all should be an array of the known locales', () => {
            expect(LocaleInfoManager.all()).toEqual(availableLocales);
        });

        it('.catalogsMap should be a map of the known locale catalogs keyed by locale code', () => {
            const reducer = (acumulator: CatalogsMap, localeCode: string): CatalogsMap => {
                return { ...acumulator, [localeCode]: aCatalog };
            };
            expect(LocaleInfoManager.catalogsMap()).toEqual(localeCodes.reduce(reducer, {}));
        });

    });

});
