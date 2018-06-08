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
I18nManager.allowRTL(true);

import { CatalogsMap, Catalog, LocaleDefinition, LocalizedText } from './types';
import { isReloadNeeded, reloadRTL, saveCurrentLocaleCode, loadCurrentLocaleCode }  from './effects';

/**
 * Types
 */
export {
    CatalogsMap,
    Catalog,
    LocaleDefinition,
    LocalizedText,
};

/**
 * Side-effects
 */
export {
    isReloadNeeded,
    reloadRTL,
    saveCurrentLocaleCode,
    loadCurrentLocaleCode,
};

export class LocaleManager {

    /**
     * Singleton nstance of LocaleManager.
     */
    private static localeManagerInstance: LocaleManager = undefined;

    /**
     * Creates a singleton instance of LocaleManager with
     * the provided locales. Throws a runtime error if called twice.
     * @param locales The list of locales to register with the singleton.
     */
    static registerLocale = (locale: LocaleDefinition, ...locales: Array<LocaleDefinition>):
        typeof LocaleManager => LocaleManager.registerLocales([locale, ...locales])

    static registerLocales(locales: ReadonlyArray<LocaleDefinition>): typeof LocaleManager {
        if (this.localeManagerInstance !== undefined) {
            throw new Error('Cannot register new locales after locale manager has been built');
        }
        this.localeManagerInstance = new LocaleManager(locales);
        return this;
    }

    static getLocale(localeCode: string): LocaleDefinition {
        return this.instance.getLocale(localeCode);
    }

    static getFallbackLocale(): LocaleDefinition {
        return this.instance.getFallbackLocale();
    }

    static get locales(): ReadonlyArray<LocaleDefinition> {
        return this.instance.locales;
    }

    static get catalogsMap(): CatalogsMap {
        return this.instance.catalogsMap;
    }

    static reset(): CatalogsMap {
        return this.localeManagerInstance = undefined;
    }

    /**
     * Returns the LocaleManager singleton instance if it exists, otherwise throws
     * a runtime error.
     */
    private static get instance(): LocaleManager {
        if (this.localeManagerInstance === undefined) {
            throw new Error('LocaleManager not initialized, registerLocales([Locale,...]) must be called first');
        }
        return this.localeManagerInstance;
    }

    private fallbackLocaleCode: string;

    private locales: ReadonlyArray<LocaleDefinition>;

    private catalogsMap: CatalogsMap;

    private constructor(locales: ReadonlyArray<LocaleDefinition>) {
        this.locales = locales;
        this.catalogsMap = buildCatalogsMap(locales);
    }

    private getLocale(localeCode: string): LocaleDefinition {
        const locale = this.findLocale(localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    private findLocale(code: string): LocaleDefinition {
        return this.locales.find((aLocale: LocaleDefinition): boolean => aLocale.code === code);
    }

    private getFallbackLocale(): LocaleDefinition {
        if (this.fallbackLocaleCode) {
            return this.getLocale(this.fallbackLocaleCode);
        } else {
            const [ fallbackLocale ]: ReadonlyArray<LocaleDefinition> = this.locales;
            return fallbackLocale;
        }
    }

}

function buildCatalogsMap(withLocales: ReadonlyArray<LocaleDefinition>): CatalogsMap {
    const reducer = (accumulator: CatalogsMap, locale: LocaleDefinition): CatalogsMap => {
        return { ...accumulator, [locale.code]: locale.catalog };
    };
    return withLocales.reduce(reducer, {});
}