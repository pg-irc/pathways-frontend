// tslint:disable:no-class no-this no-let readonly-keyword readonly-array no-expression-statement

// Unfortunately we need to load the Intl polyfill for Android. iOS has Intl
// available natively; we should see it is possibly conditionally load the
// polyfill only when needed.
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/ar.js';
import 'intl/locale-data/jsonp/fr.js';
import { I18nManager } from 'react-native';
import { CatalogsMap, Catalog, Locale, LocaleInfo, LocaleInfoWithCatalog, LocalizedText } from './types';

export { CatalogsMap, Catalog, Locale, LocaleInfo, LocalizedText };

export { needsTextDirectionChange, setTextDirection, reload, saveCurrentLocaleCode, loadCurrentLocaleCode } from './effects';

export class LocaleInfoManager {

    private static singleton: LocaleInfoManager = undefined;

    static registerSingle = (locale: LocaleInfoWithCatalog): void => {
        LocaleInfoManager.register([locale]);
    }

    static register(locale: ReadonlyArray<LocaleInfoWithCatalog>): void {
        if (this.singleton !== undefined) {
            throw new Error('Cannot register new locales after locale manager has been built');
        }
        this.singleton = new LocaleInfoManager(locale);
    }

    static reset(): void {
        this.singleton = undefined;
    }

    static get(localeCode: string): LocaleInfo {
        return this.instance().getLocaleInfo(localeCode);
    }

    static getFallback(): LocaleInfo {
        return this.instance().getFallback();
    }

    static all(): ReadonlyArray<LocaleInfo> {
        return this.instance().locales;
    }

    static catalogsMap(): CatalogsMap {
        return this.instance().catalogsMap;
    }

    private static instance(): LocaleInfoManager {
        if (this.singleton === undefined) {
            throw new Error('LocaleManager not initialized, registerLocales([Locale,...]) must be called first');
        }
        return this.singleton;
    }

    private fallbackLocaleCode: string;

    private locales: ReadonlyArray<LocaleInfo>;

    private catalogsMap: CatalogsMap;

    private constructor(locales: ReadonlyArray<LocaleInfoWithCatalog>) {
        I18nManager.allowRTL(true);
        this.setLocales(locales);
        this.fallbackLocaleCode = this.getDefaultFallbackLocaleCode(locales);
        this.catalogsMap = buildCatalogsMap(locales);
    }

    private getDefaultFallbackLocaleCode(locales: ReadonlyArray<LocaleInfo>): string {
        const [fallbackLocale]: ReadonlyArray<LocaleInfo> = locales;
        return fallbackLocale.code;
    }

    private setLocales(locales: ReadonlyArray<LocaleInfoWithCatalog>): LocaleInfoManager {
        this.locales = locales.map((localeInfoWithCatalog: LocaleInfoWithCatalog) => ({
            code: localeInfoWithCatalog.code,
            label: localeInfoWithCatalog.label,
        }));
        return this;
    }

    private getLocaleInfo(localeCode: string): LocaleInfo {
        const locale = this.findLocale(localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    private findLocale(code: string): LocaleInfo {
        return this.locales.find((aLocale: LocaleInfo): boolean => aLocale.code === code);
    }

    private getFallback(): LocaleInfo {
        return this.getLocaleInfo(this.fallbackLocaleCode);
    }

}

function buildCatalogsMap(withLocales: ReadonlyArray<LocaleInfoWithCatalog>): CatalogsMap {
    const reducer = (accumulator: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => {
        return { ...accumulator, [locale.code]: locale.catalog };
    };
    return withLocales.reduce(reducer, {});
}