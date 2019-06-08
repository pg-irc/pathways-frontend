import { Store } from '../stores';
import * as questionnaire from '../stores/questionnaire';

export const isApplicationLoading = (appStore: Store): boolean => {
    return appStore.fonts.loading ||
        appStore.locale.loading ||
        questionnaire.isLoading(appStore.questionnaire);
};
