// tslint:disable:no-expression-statement
import { Catalog, CatalogsMap, LocaleInfoWithCatalog, Locales } from '../locales';
import { aString } from '../helpers/random_test_values';
import { LocaleInfoWithCatalogBuilder } from '../../stores/__tests__/helpers/locale_helpers';

describe('LocaleManager', () => {

    describe('before .registerLocales() is called', () => {

        beforeEach(() => Locales.reset());

        it('.getFallback() should not throw an error', () => {
            Locales.getFallback();
        });

        it('.catalogsMap should throw an error', () => {
            expect(() => Locales.catalogsMap()).toThrow();
        });

    });

    describe('register locale info', () => {

        beforeEach(() => {
            Locales.reset();
        });

        it('processes the locale code', () => {
            const code = aString();
            const aLocale = new LocaleInfoWithCatalogBuilder().withCode(code).build();
            Locales.register([aLocale]);

            const result = Locales.getLocaleInfoWithCatalog(code);

            expect(result.code).toEqual(code);
        });

        it('processes the locale label', () => {
            const code = aString();
            const label = aString();
            const aLocale = new LocaleInfoWithCatalogBuilder().withCode(code).withLabel(label).build();
            Locales.register([aLocale]);

            const result = Locales.getLocaleInfoWithCatalog(code);

            expect(result.label).toEqual(label);
        });

        it('processes the locale catalog', () => {
            const code = aString();
            const catalog: Catalog = { this: 'that'};
            const aLocale = new LocaleInfoWithCatalogBuilder().withCode(code).withCatalog(catalog).build();
            Locales.register([aLocale]);

            const result = Locales.getLocaleInfoWithCatalog(code);

            expect(result.catalog).toEqual(catalog);
        });
    });

    describe('.registerLocales()', () => {

        const aLocale = new LocaleInfoWithCatalogBuilder().build();

        beforeEach(() => {
            Locales.reset();
        });

        afterEach(() => {
            Locales.reset();
        })

        it('should throw an error if called twice', () => {
            Locales.register([aLocale]);
            expect(() => Locales.register([aLocale])).toThrow();
        });

    });

    describe('with locales registered', () => {

        const localeCodes: ReadonlyArray<string> = ['en', 'ar', 'zh'];
        const availableLocales: ReadonlyArray<LocaleInfoWithCatalog> = localeCodes.map((localeCode: string): LocaleInfoWithCatalog => (
            new LocaleInfoWithCatalogBuilder().withCode(localeCode).build()
        ));

        const aCatalog = {};

        beforeAll(() => {
            Locales.register(availableLocales);
        });

        it('.get() should return a locale when given a known locale code', () => {
            const aLocale = availableLocales[availableLocales.length - 1];
            expect(Locales.getLocaleInfoWithCatalog(aLocale.code)).toEqual(aLocale);
        });

        it('.get() should throw an error if given an unknown locale code', () => {
            expect(() => Locales.getLocaleInfoWithCatalog(aString())).toThrow();
        });

        it('the default fallback locale should be English', () => {
            expect(Locales.getFallback()).toEqual('en');
        });

        it('.catalogsMap should be a map of the known locale catalogs keyed by locale code', () => {
            const reducer = (acumulator: CatalogsMap, localeCode: string): CatalogsMap => {
                return { ...acumulator, [localeCode]: aCatalog };
            };
            expect(Locales.catalogsMap()).toEqual(localeCodes.reduce(reducer, {}));
        });
    });
});
