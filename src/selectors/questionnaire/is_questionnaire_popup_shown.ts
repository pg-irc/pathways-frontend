import { Store } from '../../stores';
import { QuestionnaireRouteState, ValidQuestionnaireStore } from '../../fixtures/types/questionnaire';

export const isQuestionnairePopupShown = (appStore: Store): boolean => {
    const store = appStore.questionnaireInStore;
    if (store instanceof ValidQuestionnaireStore) {
        return store.questionnaireRouteState === QuestionnaireRouteState.ShowQuestionnairePopup;
    }
    return false;
};
