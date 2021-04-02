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

export { CatalogsMap, Catalog, Locale, LocaleInfo, LocalizedText };

export { needsTextDirectionChange, setTextDirection, reload, saveCurrentLocaleCode, loadCurrentLocaleCode } from './effects';

export class LocaleInfoManager {

    private static singleton: LocaleInfoManager = undefined;

    // TODO make this a regular function that stores the data in a variable with file scope.
    // It also needs to create the catalogs map.
    static register(locale: ReadonlyArray<LocaleInfoWithCatalog>): void {
        if (this.singleton !== undefined) {
            throw new Error('Cannot register new locales after locale manager has been built');
        }
        // TODO the constructor and its helper function does some useful work, inline that here
        this.singleton = new LocaleInfoManager(locale);
    }

    // TODO remove this function
    static reset(): void {
        this.singleton = undefined;
    }

    // TODO remove the LocaleInfo type, this function should just return its input argument, then remove the function altogether
    static get(localeCode: string): LocaleInfo {
        return this.instance().getLocaleInfo(localeCode);
    }

    // TODO remove function, hard-code 'en' as fallback locale
    static getFallback(): LocaleInfo {
        return this.instance().locales[0];
    }

    // TODO just return the value that as received by register()
    static all(): ReadonlyArray<LocaleInfo> {
        return this.instance().locales;
    }

    // TODO return the catalogs map
    static catalogsMap(): CatalogsMap {
        return this.instance().catalogsMap;
    }

    // TODO remove
    private static instance(): LocaleInfoManager {
        if (this.singleton === undefined) {
            throw new Error('LocaleManager not initialized, registerLocales([Locale,...]) must be called first');
        }
        return this.singleton;
    }

    // TODO make a file scope variable for this
    private locales: ReadonlyArray<LocaleInfo>;

    // TODO make a file scope variable for this
    private catalogsMap: CatalogsMap;

    // TODO refactor this function away, all of this logic can be inlined in the register function
    private constructor(locales: ReadonlyArray<LocaleInfoWithCatalog>) {
        I18nManager.allowRTL(true);
        this.catalogsMap = buildCatalogsMap(locales);
        this.locales = locales.map((localeInfoWithCatalog: LocaleInfoWithCatalog): LocaleInfo => ({
            code: localeInfoWithCatalog.code,
            label: localeInfoWithCatalog.label,
        }));
    }

    // TODO remove this function
    private getLocaleInfo(localeCode: string): LocaleInfo {
        const locale = this.findLocale(localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    // TODO remove this function
    private findLocale(code: string): LocaleInfo {
        return this.locales.find((aLocale: LocaleInfo): boolean => aLocale.code === code);
    }
}

function buildCatalogsMap(withLocales: ReadonlyArray<LocaleInfoWithCatalog>): CatalogsMap {
    const reducer = (accumulator: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => {
        return { ...accumulator, [locale.code]: locale.catalog };
    };
    return withLocales.reduce(reducer, {});
}
