// tslint:disable: no-this readonly-keyword no-expression-statement no-class
import { getAvailableLocales } from '../../application/locales';
import { RegionLocaleState } from '../../validation/region/types';
import * as constants from '../../application/constants';
import { SelectRegionLocaleAction } from './actions';

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

export const buildDefaultState = (): RegionLocaleState => ({
    region: undefined,
    locale: undefined,
    availableLocales: [],
});
