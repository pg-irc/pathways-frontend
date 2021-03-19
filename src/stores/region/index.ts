import * as constants from '../../application/constants';
import { RegionCode } from '../../region/types';
import * as actions from './actions';

export interface RegionStore {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export const buildDefaultStore = (): RegionStore => ({
    code: undefined,
    fallback: undefined,
});

export const reducer = (store: RegionStore = buildDefaultStore(), action?: actions.RegionAction): RegionStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_CURRENT_REGION:
            return { ...store, code: action.payload.regionCode };
        default:
            return store;
    }
};
