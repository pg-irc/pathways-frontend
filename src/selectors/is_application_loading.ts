import { Store } from '../stores';
import * as questionnaire from '../stores/questionnaire';

export const isApplicationLoading = (appStore: Store): boolean => {
    return appStore.fontsInStore.loading ||
        appStore.localeInStore.loading ||
        questionnaire.isLoading(appStore.questionnaireInStore);
};
