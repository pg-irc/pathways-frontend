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

    let theLocale: Locale = new LocaleBuilder().build();

    it('selects the correct localized version of the text', () => {
        const theText = aString();
        const theLocalizedText = new LocalizedTextBuilder(theLocale.code, theText).build();
        expect(selectLocalizedText(theLocale, theLocalizedText)).toBe(theText);
    });

    it('selects text from the fallback locale if the current locale is not available', () => {
        const theFallbackText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocale(theLocale.fallback, theFallbackText).build();
        expect(selectLocalizedText(theLocale, theLocalizedText)).toBe(theFallbackText);
    });

    it('returns error if string is not available in the fallback locale', () => {
        const theLocalizedText = new LocalizedTextBuilder().build();
        expect(selectLocalizedText(theLocale, theLocalizedText)).toContain('missing');
    });

});