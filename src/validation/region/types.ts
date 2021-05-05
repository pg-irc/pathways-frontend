import { LocaleWithLabel } from "../../application/locales";
import * as constants from '../../application/constants';
import * as helpers from '../../stores/helpers/make_action';

export interface Region {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export enum RegionCode {
    BC = 'bc',
    MB = 'mb',
}

export interface RegionLocaleMap {
    readonly region: RegionCode;
    readonly locale: string;
    readonly availableLocales: ReadonlyArray<LocaleWithLabel>;
}

export type SelectRegionAction = Readonly<ReturnType<typeof selectRegion>>;
export type SelectLocaleAction = Readonly<ReturnType<typeof selectLocale>>;

// tslint:disable-next-line:typedef
export const selectRegion = (region: RegionCode) => (
    helpers.makeAction(constants.SELECT_REGION, { region })
);

// tslint:disable-next-line:typedef
export const selectLocale = (locale: string) => (
    helpers.makeAction(constants.SELECT_LOCALE, { locale })
);