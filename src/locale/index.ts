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
import { CatalogsMap, Catalog, LocaleCode, LocaleInfoWithCatalog, LocalizedText, LocaleWithLabel } from './types';
import * as R from 'ramda';

export { CatalogsMap, Catalog, LocaleCode, LocalizedText };

export { needsTextDirectionChange, setTextDirection, reload, saveCurrentLocaleCode, loadCurrentLocaleCode } from './effects';

export namespace LocaleInfoManager {

    let _locales: ReadonlyArray<LocaleInfoWithCatalog> = [];
    let _catalogsMap: CatalogsMap = {};

    export const reset = (): void => {
        _locales = [];
        _catalogsMap = {};
    };

    export const getFallback = (): LocaleCode => 'en';

    export const register = (locales: ReadonlyArray<LocaleInfoWithCatalog>): void => {
        if (R.not(R.isEmpty(_locales))) {
            throw new Error('Locales have already been initialized');
        }
        I18nManager.allowRTL(true);
        _locales = locales;
        _catalogsMap = buildCatalogsMap(locales);
    };

    const buildCatalogsMap = (locales: ReadonlyArray<LocaleInfoWithCatalog>): CatalogsMap => {
        const addCatalogToMap = (acc: CatalogsMap, locale: LocaleInfoWithCatalog): CatalogsMap => (
            { ...acc, [locale.code]: locale.catalog }
        );
        return R.reduce(addCatalogToMap, {}, locales);
    };

    export const catalogsMap = (): CatalogsMap => {
        validate();
        return _catalogsMap;
    };

    const validate = (): void => {
        if (R.isEmpty(_locales) || R.isEmpty(_catalogsMap)) {
            throw new Error('Locales have not been initialized');
        }
    };

    export const getLocalesWithLabels  = (): ReadonlyArray<LocaleWithLabel> => {
        validate();
        return _locales.map((locale: LocaleInfoWithCatalog): LocaleWithLabel => ({
            code: locale.code,
            label: locale.label,
        }));
    };

    // TODO this function is only used in tests, use catalogsMap() instead and remove this
    export const getLocaleInfoWithCatalog = (localeCode: string): LocaleInfoWithCatalog => {
        validate();
        const locale = _locales.find((aLocale: LocaleInfoWithCatalog): boolean => aLocale.code === localeCode);
        if (locale === undefined) {
            throw new Error(`Unknown locale code: ${localeCode}`);
        }
        return locale;
    };
}
