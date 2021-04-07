// tslint:disable:no-let no-expression-statement
import { LocaleStoreBuilder, LocalizedTextBuilder, aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import { getLocalizedText, getLocalizedTextOrDefault } from '../locale/get_localized_text';
import * as locale from '../../stores/locale';
import { aString } from '../../application/helpers/random_test_values';
import { toSelectorLocale } from '../locale/to_selector_locale';

describe('locale selectors fetch', () => {

    let aLocaleStore: locale.LocaleStore;

    beforeEach(() => {
        aLocaleStore = new LocaleStoreBuilder().build();
    });

    it('the locale code', () => {
        const theLocale = toSelectorLocale(aLocaleStore);
        expect(theLocale.code).toBe(aLocaleStore.code);
    });

});

describe('localized text selector', () => {

    it('returns the localized string if it exists', () => {
        const englishText = aString();
        const frenchText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocalizedText('en', englishText).addLocalizedText('fr', frenchText).build();

        const result = getLocalizedText({code: 'fr', fallback: 'en'}, theLocalizedText);

        expect(result).toBe(frenchText);
    });

    it('returns english string if the localized string does not exist', () => {
        const englishText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocalizedText('en', englishText).build();

        const result = getLocalizedText({code: 'fr', fallback: 'en'}, theLocalizedText);

        expect(result).toBe(englishText);
    });

    it('returns an error string if the string does not exist in either langage', () => {
        const tagalogText = aString();
        const theLocalizedText = new LocalizedTextBuilder().addLocalizedText('tg', tagalogText).build();

        const result = getLocalizedText({code: 'fr', fallback: 'en'}, theLocalizedText);

        expect(result).toBe('missing in fr&en');
    });

    let theLocale = aLocale();

    it('selects the correct localized version of the text', () => {
        const theText = aString();
        const theFallbackText = aString();
        const theLocalizedText = new LocalizedTextBuilder().
            addLocalizedText(theLocale.code, theText).
            addLocalizedText(theLocale.fallback, theFallbackText).
            build();
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

describe('localized text selector with default', () => {

    let theLocale = aLocale();

    it('returns the default value when the localized string is missing', () => {
        const theLocalizedText = new LocalizedTextBuilder().build();
        const theDefault = aString();
        expect(getLocalizedTextOrDefault(theDefault, theLocale, theLocalizedText)).toBe(theDefault);
    });
});
