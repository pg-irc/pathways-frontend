import { InvalidStore, Store } from './tagged_stores';
import { QuestionnaireAction } from './actions';
import * as constants from '../../application/constants';

export const reduceInvalidStore = (store: InvalidStore, action?: QuestionnaireAction): Store => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.CLEAR_ERROR_STATE:
            return store.lastValidStore;

        default:
            return store;
    }
};
