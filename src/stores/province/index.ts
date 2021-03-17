import * as constants from '../../application/constants';
import * as actions from './actions';

export interface ProvinceStore {
    readonly code: string;
    readonly fallback: string;
}

export const buildDefaultStore = (): ProvinceStore => ({
    code: undefined,
    fallback: undefined,
});

export const reducer = (store: ProvinceStore = buildDefaultStore(), action?: actions.ProvinceAction): ProvinceStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_CURRENT_PROVINCE:
            return { ...store, code: action.payload.provinceCode };
        default:
            return store;
    }
};
