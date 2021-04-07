// tslint:disable:no-let no-expression-statement
import { LocaleStoreBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { getLocalizedText } from '../locale/get_localized_text';
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
        const theLocalizedText = { 'en': englishText, 'fr': frenchText};

        const result = getLocalizedText({code: 'fr'}, theLocalizedText);

        expect(result).toBe(frenchText);
    });

    it('returns english string if the localized string does not exist', () => {
        const englishText = aString();
        const theLocalizedText = {'en': englishText };

        const result = getLocalizedText({code: 'fr' }, theLocalizedText);

        expect(result).toBe(englishText);
    });

    it('returns an error string if the string does not exist in either langage', () => {
        const tagalogText = aString();
        const theLocalizedText = { 'tg': tagalogText };

        const result = getLocalizedText({code: 'fr'}, theLocalizedText);

        expect(result).toBe('missing in fr&en');
    });
});
