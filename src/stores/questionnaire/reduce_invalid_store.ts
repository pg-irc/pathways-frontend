import { InvalidStore, Store } from './stores';
import { QuestionnaireAction } from './actions';
import * as constants from '../../application/constants';

export const reduceInvalidStore = (store: InvalidStore, action?: QuestionnaireAction): Store => {
    if (action && action.type === constants.CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};
