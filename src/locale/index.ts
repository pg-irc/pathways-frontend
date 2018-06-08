// tslint:disable:no-class no-this no-let readonly-keyword readonly-array no-expression-statement
// Unfortunately we need to load the Intl polyfill for Android. iOS has Intl
// available natively; we should see it is possibly conditionally load the
// polyfill only when needed.
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/ar.js';
import 'intl/locale-data/jsonp/zh.js';
// Tell OS to enable RTL support.
import { I18nManager } from 'react-native';
import { CatalogsMap, Catalog, Locale, LocaleInfo, LocaleInfoWithCatalog, LocalizedText } from './types';

/**
 * Types
 */
export { CatalogsMap, Catalog, Locale, LocaleInfo, LocalizedText };

/**
 * Side-effects
 */
export { needsTextDirectionChange, toggleTextDirection, reload, saveCurrentLocaleCode, loadCurrentLocaleCode }  from './effects';

export class LocaleInfoManager {

    /**
     * Singleton nstance of LocaleManager.
     */
    private static localeInfoManagerInstance: LocaleInfoManager = undefined;

    /**
     * Creates a singleton instance of LocaleManager with
     * the provided locales. Throws a runtime error if called twice.
     * @param locales The list of locales to register with the singleton.
     */
    static registerSingle = (locale: LocaleInfoWithCatalog, ...locales: Array<LocaleInfoWithCatalog>):
        typeof LocaleInfoManager => LocaleInfoManager.register([locale, ...locales])

    static register(locale: ReadonlyArray<LocaleInfoWithCatalog>): typeof LocaleInfoManager {
        if (this.localeInfoManagerInstance !== undefined) {
            throw new Error('Cannot register new locales after locale manager has been built');
        }
        this.localeInfoManagerInstance = new LocaleInfoManager(locale);
        return this;
    }

    static reset(): typeof LocaleInfoManager {
        this.localeInfoManagerInstance = undefined;
        return this;
    }

    static get(localeCode: string): LocaleInfo {
        return this.instance.getLocaleInfo(localeCode);
    }

    static getFallback(): LocaleInfo {
        return this.instance.getFallback();
    }

    static get all(): ReadonlyArray<LocaleInfo> {
        return this.instance.locales;
    }

    static get catalogsMap(): CatalogsMap {
        return this.instance.catalogsMap;
    }

    /**
     * Returns the LocaleManager singleton instance if it exists, otherwise throws
     * a runtime error.
     */
    private static get instance(): LocaleInfoManager {
        if (this.localeInfoManagerInstance === undefined) {
            throw new Error('LocaleManager not initialized, registerLocales([Locale,...]) must be called first');
        }
        return this.localeInfoManagerInstance;
    }

    private fallbackLocaleCode: string;

    private locales: ReadonlyArray<LocaleInfo>;

    private catalogsMap: CatalogsMap;

    private constructor(locales: ReadonlyArray<LocaleInfoWithCatalog>) {
        I18nManager.allowRTL(true);
        this.locales = locales.map((localeInfoWithCatalog: LocaleInfoWithCatalog) => ({
            code: localeInfoWithCatalog.code,
            label: localeInfoWithCatalog.label,
            isRTL: localeInfoWithCatalog.isRTL,
        }));
        this.catalogsMap = buildCatalogsMap(locales);
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
        if (this.fallbackLocaleCode) {
            return this.getLocaleInfo(this.fallbackLocaleCode);
        } else {
            const [ fallbackLocale ]: ReadonlyArray<LocaleInfo> = this.locales;
            return fallbackLocale;
        }
    }

}

function buildCatalogsMap(withLocales: ReadonlyArray<LocaleInfoWithCatalog>): CatalogsMap {
    const reducer = (accumulator: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => {
        return { ...accumulator, [locale.code]: locale.catalog };
    };
    return withLocales.reduce(reducer, {});
}