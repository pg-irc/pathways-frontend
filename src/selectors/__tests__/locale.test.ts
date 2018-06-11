// tslint:disable:no-let no-expression-statement
import { LocaleStoreBuilder, LocalizedTextBuilder, LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { selectLocale, selectAvailableLocales, selectLocalizedText } from '../locale';
import { ApplicationStoreBuilder } from '../../stores/__tests__/helpers/store_helpers';
import { Store } from '../../application/store';
import * as locale from '../../stores/locale';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { Locale } from '../../locale';

describe('locale selectors fetch', () => {

    let theStore: Store;
    let aLocaleStore: locale.Store;

    beforeEach(() => {
        aLocaleStore = new LocaleStoreBuilder().build();
        theStore = {
            applicationState: new ApplicationStoreBuilder().withLocaleStore(aLocaleStore).build(),
        };
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
        const availableLocales = selectAvailableLocales(theStore);
        expect(availableLocales).toBe(aLocaleStore.availableLocales);
    });

});

describe('localized text selector', () => {

    let theLocale: Locale;
    let theText: string;
    let theFallbackLocaleCode: string;
    let theFallbackText: string;

    beforeEach(() => {
        theLocale = new LocaleBuilder().build();
        theText = aString();
        theFallbackLocaleCode = aString();
        theFallbackText = aString();
    });

    it('selects the correct localized version of the text', () => {
        const theLocalizedText = new LocalizedTextBuilder(theLocale.code, theText).build();
        expect(selectLocalizedText(theLocale, theLocalizedText)).toBe(theText);
    });

    it('selects text from the fallback locale if the current locale is not available', () => {
        const theLocalizedText = new LocalizedTextBuilder(theLocale.code, theText)
                .addLocale(theFallbackLocaleCode, theFallbackText)
                .build();
        const aLocale = new LocaleBuilder().withFallback(theFallbackLocaleCode).build();
        expect(selectLocalizedText(aLocale, theLocalizedText)).toBe(theFallbackText);
    });

    it('throws an error if the text is not available in the fallback locale', () => {
        const theLocalizedText = new LocalizedTextBuilder(theLocale.code, theText).build();
        const aLocale = new LocaleBuilder().build();
        expect(() => selectLocalizedText(aLocale, theLocalizedText)).toThrow();
    });

});