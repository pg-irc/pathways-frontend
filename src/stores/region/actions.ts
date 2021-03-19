import * as constants from '../../application/constants';
import { RegionCode } from '../../region/types';
import * as helpers from '../helpers/make_action';

export type LoadRegionAction = Readonly<ReturnType<typeof loadRegion>>;
export type SaveRegionAction = Readonly<ReturnType<typeof saveRegion>>;

// tslint:disable-next-line:typedef
export const loadRegion = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_REGION);
};

// tslint:disable-next-line:typedef
export const saveRegion = (regionCode: RegionCode) => {
    return helpers.makeAction(constants.SAVE_CURRENT_REGION, { regionCode });
};

export type RegionAction = LoadRegionAction | SaveRegionAction;