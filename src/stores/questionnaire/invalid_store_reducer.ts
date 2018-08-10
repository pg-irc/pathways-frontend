import { InvalidStore, AnyTaggedStore, tagAsInvalid, tagAsValid } from './tagged_stores';
import { QuestionnaireAction } from './actions';
import * as constants from '../../application/constants';

export const invalidStoreReducer = (store: InvalidStore, action?: QuestionnaireAction): AnyTaggedStore => {
    if (!action) {
        return tagAsInvalid(store);
    }

    switch (action.type) {
        case constants.CLEAR_ERROR_STATE:
            return tagAsValid(store.lastValidState);

        default:
            return tagAsInvalid(store);
    }
};
