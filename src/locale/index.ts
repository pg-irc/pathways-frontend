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

export class LocaleDefinitionManager {

    /**
     * Singleton nstance of LocaleManager.
     */
    private static localeDefinitionManagerInstance: LocaleDefinitionManager = undefined;

    /**
     * Creates a singleton instance of LocaleManager with
     * the provided locales. Throws a runtime error if called twice.
     * @param localeDefinitions The list of locales to register with the singleton.
     */
    static registerSingle = (localeDefinition: LocaleDefinition, ...localeDefinitions: Array<LocaleDefinition>):
        typeof LocaleDefinitionManager => LocaleDefinitionManager.register([localeDefinition, ...localeDefinitions])

    static register(localeDefinitions: ReadonlyArray<LocaleDefinition>): typeof LocaleDefinitionManager {
        if (this.localeDefinitionManagerInstance !== undefined) {
            throw new Error('Cannot register new locales after locale manager has been built');
        }
        this.localeDefinitionManagerInstance = new LocaleDefinitionManager(localeDefinitions);
        return this;
    }

    static reset(): typeof LocaleDefinitionManager {
        this.localeDefinitionManagerInstance = undefined;
        return this;
    }

    static get(localeCode: string): LocaleDefinition {
        return this.instance.getLocaleDefinition(localeCode);
    }

    static getFallback(): LocaleDefinition {
        return this.instance.getFallbackLocaleDefinition();
    }

    static get all(): ReadonlyArray<LocaleDefinition> {
        return this.instance.localeDefinitions;
    }

    static get catalogsMap(): CatalogsMap {
        return this.instance.catalogsMap;
    }

    /**
     * Returns the LocaleManager singleton instance if it exists, otherwise throws
     * a runtime error.
     */
    private static get instance(): LocaleDefinitionManager {
        if (this.localeDefinitionManagerInstance === undefined) {
            throw new Error('LocaleManager not initialized, registerLocales([Locale,...]) must be called first');
        }
        return this.localeDefinitionManagerInstance;
    }

    private fallbackLocaleCode: string;

    private localeDefinitions: ReadonlyArray<LocaleDefinition>;

    private catalogsMap: CatalogsMap;

    private constructor(locales: ReadonlyArray<LocaleDefinition>) {
        this.localeDefinitions = locales;
        this.catalogsMap = buildCatalogsMap(locales);
    }

    private getLocaleDefinition(localeCode: string): LocaleDefinition {
        const locale = this.findLocale(localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    }

    private findLocale(code: string): LocaleDefinition {
        return this.localeDefinitions.find((aLocale: LocaleDefinition): boolean => aLocale.code === code);
    }

    private getFallbackLocaleDefinition(): LocaleDefinition {
        if (this.fallbackLocaleCode) {
            return this.getLocaleDefinition(this.fallbackLocaleCode);
        } else {
            const [ fallbackLocale ]: ReadonlyArray<LocaleDefinition> = this.localeDefinitions;
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