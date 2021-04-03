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
import { CatalogsMap, Catalog, Locale, LocaleInfo, LocaleInfoWithCatalog, LocalizedText, LocaleWithLabel } from './types';
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
        this._locales = locales;
        const reducer = (accumulator: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => {
            return { ...accumulator, [locale.code]: locale.catalog };
        };
        this._catalogsMap = locales.reduce(reducer, {});
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

    // TODO remove function, hard-code 'en' as fallback locale
    static getFallback(): LocaleInfo {
        this.validate();
        return this._locales[0];
    }

    // TODO return the catalogs map
    static catalogsMap(): CatalogsMap {
        this.validate();
        return this._catalogsMap;
    }

    // TODO remove this function
    static get(localeCode: string): LocaleInfoWithCatalog {
        this.validate();
        const locale = this._locales.find((aLocale: LocaleInfo): boolean => aLocale.code === localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    static getLocalesWithLabels(): ReadonlyArray<LocaleWithLabel> {
        return this._locales.map((f: LocaleInfoWithCatalog): LocaleWithLabel => ({
            code: f.code, label: f.label,
        }));
    }
}
