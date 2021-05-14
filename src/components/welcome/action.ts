import * as helpers from '../../stores/helpers/make_action';
import * as constants from '../../application/constants';
import { RegionCode } from '../../validation/region/types';

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