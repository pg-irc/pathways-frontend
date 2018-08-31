import { InvalidQuestionnaireStore, QuestionnaireStore } from './stores';
import { QuestionnaireAction } from './actions';
import * as constants from '../../application/constants';

export const reduceInvalidStore = (store: InvalidQuestionnaireStore, action?: QuestionnaireAction): QuestionnaireStore => {
    if (action && action.type === constants.CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};
