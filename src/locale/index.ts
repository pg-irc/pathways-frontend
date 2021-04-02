// tslint:disable:no-class no-this no-let readonly-keyword readonly-array no-expression-statement

// Unfortunately we need to load the Intl polyfill for Android. iOS has Intl
// available natively; we should see it is possibly conditionally load the
// polyfill only when needed.
import 'intl';
// TODO the next three lines are probably not needed, since the other 5 locales work just fine
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/ar.js';
import 'intl/locale-data/jsonp/fr.js';
import { I18nManager } from 'react-native';
import { CatalogsMap, Catalog, Locale, LocaleInfo, LocaleInfoWithCatalog, LocalizedText } from './types';
import * as R from 'ramda';

export { CatalogsMap, Catalog, Locale, LocaleInfo, LocalizedText };

export { needsTextDirectionChange, setTextDirection, reload, saveCurrentLocaleCode, loadCurrentLocaleCode } from './effects';

export class LocaleInfoManager {

    private static _locales: ReadonlyArray<LocaleInfoWithCatalog> = [];
    private static _catalogsMap: CatalogsMap = {};

    // TODO make this a regular function that stores the data in a variable with file scope.
    // It also needs to create the catalogs map.
    static register(locales: ReadonlyArray<LocaleInfoWithCatalog>): void {
        if (R.not(R.isEmpty(this._locales))) {
            throw new Error('Locales have already been initialized');
        }
        I18nManager.allowRTL(true);
        const reducer = (accumulator: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => {
            return { ...accumulator, [locale.code]: locale.catalog };
        };
        this._catalogsMap = locales.reduce(reducer, {});
        this._locales = locales.map((localeInfoWithCatalog: LocaleInfoWithCatalog): LocaleInfoWithCatalog => ({
            code: localeInfoWithCatalog.code,
            label: localeInfoWithCatalog.label,
            catalog: localeInfoWithCatalog.catalog,
        }));
    }

    // TODO remove this function
    static reset(): void {
        this._locales = [];
        this._catalogsMap = {};
    }

    static validate(): void {
        if (R.isEmpty(this._locales) || R.isEmpty(this._catalogsMap)) {
            throw new Error('Locales have not been initialized');
        }
    }

    // TODO remove the LocaleInfo type, this function should just return its input argument, then remove the function altogether
    static get(localeCode: string): LocaleInfoWithCatalog {
        return this.getLocaleInfo(localeCode);
    }

    // TODO remove function, hard-code 'en' as fallback locale
    static getFallback(): LocaleInfo {
        this.validate();
        return this._locales[0];
    }

    // TODO just return the value that as received by register()
    static all(): ReadonlyArray<LocaleInfo> {
        this.validate();
        return this._locales;
    }

    // TODO return the catalogs map
    static catalogsMap(): CatalogsMap {
        this.validate();
        return this._catalogsMap;
    }

    // TODO remove this function
    private static getLocaleInfo(localeCode: string): LocaleInfoWithCatalog {
        const locale = this.findLocale(localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    // TODO remove this function
    private static findLocale(code: string): LocaleInfoWithCatalog {
        return this._locales.find((aLocale: LocaleInfo): boolean => aLocale.code === code);
    }
}
