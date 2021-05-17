// tslint:disable: no-this readonly-keyword no-expression-statement no-class
import { LocaleCode, LocaleWithLabel } from '../../../application/locales';
import { RegionCode, RegionLocaleState } from '../../../validation/region/types';
import { aBoolean, aString } from '../../../application/helpers/random_test_values';

export class RegionLocaleStateBuilder {
    region: RegionCode = aBoolean() ? RegionCode.BC : RegionCode.MB;
    locale: string = aString();
    availableLocales: ReadonlyArray<LocaleWithLabel> = [
        { code: aString(), label: aString() },
        { code: aString(), label: aString() },
        { code: aString(), label: aString() },
        { code: aString(), label: aString() },
    ];

    withRegion(region: RegionCode): RegionLocaleStateBuilder {
        this.region = region;
        return this;
    }

    withLocale(locale: LocaleCode): RegionLocaleStateBuilder {
        this.locale = locale;
        return this;
    }

    withAvailableLocale(availableLocales: ReadonlyArray<LocaleWithLabel>): RegionLocaleStateBuilder {
        this.availableLocales = availableLocales;
        return this;
    }

    build(): RegionLocaleState {
        return {
            region: this.region,
            locale: this.locale,
            availableLocales: this.availableLocales,
        };
    }
}

export const buildDefaultState = (): RegionLocaleState => ({
    region: undefined,
    locale: undefined,
    availableLocales: [],
});
