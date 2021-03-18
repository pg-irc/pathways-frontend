import * as constants from '../../application/constants';
import { ProvinceCode } from '../../province/types';
import * as helpers from '../helpers/make_action';

export type LoadProvinceAction = Readonly<ReturnType<typeof loadProvince>>;
export type SaveProvinceAction = Readonly<ReturnType<typeof saveProvince>>;

// tslint:disable-next-line:typedef
export const loadProvince = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_PROVINCE);
};

// tslint:disable-next-line:typedef
export const saveProvince = (provinceCode: ProvinceCode) => {
    return helpers.makeAction(constants.SAVE_CURRENT_PROVINCE, { provinceCode });
};

export type ProvinceAction = LoadProvinceAction | SaveProvinceAction;