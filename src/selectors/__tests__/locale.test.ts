// tslint:disable:no-let no-expression-statement
import { LocaleStoreBuilder, LocalizedTextBuilder, aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import { getLocalizedText } from '../locale/get_localized_text';
import { ApplicationStoreBuilder } from '../../stores/__tests__/helpers/store_helpers';
import { Store } from '../../stores';
import * as locale from '../../stores/locale';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { selectLocale } from '../locale/select_locale';
import { pullAvailableLocales } from '../locale/pull_available_locales';

describe('locale selectors fetch', () => {

    let theStore: Store;
    let aLocaleStore: locale.Store;

    beforeEach(() => {
        aLocaleStore = new LocaleStoreBuilder().build();
        theStore = new ApplicationStoreBuilder().withLocaleStore(aLocaleStore).build();
    });

    it('the locale code', () => {
        const theLocale = selectLocale(theStore);
        expect(theLocale.code).toBe(aLocaleStore.code);
    });

    it('the fallback locale', () => {
        const theLocale = selectLocale(theStore);
        expect(theLocale.fallback).toBe(aLocaleStore.fallback);
    });

    it('the available locales', () => {
        const availableLocales = pullAvailableLocales(theStore);
        expect(availableLocales).toBe(aLocaleStore.availableLocales);
    });

});

describe('localized text selector', () => {

    let theLocale = aLocale();

    it('selects the correct localized version of the text', () => {
        const theText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocalizedText(theLocale.code, theText).build();
        expect(getLocalizedText(theLocale, theLocalizedText)).toBe(theText);
    });

    it('selects text from the fallback locale if the current locale is not available', () => {
        const theFallbackText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocalizedText(theLocale.fallback, theFallbackText).build();
        expect(getLocalizedText(theLocale, theLocalizedText)).toBe(theFallbackText);
    });

    it('returns error if string is not available in the fallback locale', () => {
        const theLocalizedText = new LocalizedTextBuilder().build();
        expect(getLocalizedText(theLocale, theLocalizedText)).toContain('missing');
    });

});