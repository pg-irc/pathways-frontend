// tslint:disable: no-this readonly-keyword no-expression-statement no-class
import { getAvailableLocales, LocaleCode, LocaleWithLabel } from '../../application/locales';
import { RegionCode, RegionLocaleState } from '../../validation/region/types';
import * as constants from '../../application/constants';
import * as helpers from '../../stores/helpers/make_action';
import { aBoolean, aString } from '../../application/helpers/random_test_values';

export type SelectRegionAction = Readonly<ReturnType<typeof selectRegion>>;
export type SelectLocaleAction = Readonly<ReturnType<typeof selectLocale>>;
export type SelectRegionLocaleAction = SelectRegionAction | SelectLocaleAction;

// tslint:disable-next-line:typedef
export const selectRegion = (region: RegionCode) => (
    helpers.makeAction(constants.SELECT_REGION, { region })
);

// tslint:disable-next-line:typedef
export const selectLocale = (locale: string) => (
    helpers.makeAction(constants.SELECT_LOCALE, { locale })
);

export class RegionLocaleStateBuilder {
    region: RegionCode = aBoolean() ? RegionCode.BC : RegionCode.MB;
    locale: string = aString();
    availableLocales: ReadonlyArray<LocaleWithLabel> = [];

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

export const reducer = (regionState: RegionLocaleState = buildDefaultState(), action: SelectRegionLocaleAction = undefined): RegionLocaleState => {
    if (!action) {
        return regionState;
    }
    switch (action.type) {
        case constants.SELECT_REGION:
            return {
                ...regionState,
                region: action.payload.region,
                locale: undefined,
                availableLocales: getAvailableLocales(action.payload.region),
            };
        case constants.SELECT_LOCALE:
            return {
                ...regionState,
                locale: action.payload.locale,
            };
        default:
            return regionState;
    }
};

const buildDefaultState = (): RegionLocaleState => ({
    region: undefined,
    locale: undefined,
    availableLocales: [],
});
