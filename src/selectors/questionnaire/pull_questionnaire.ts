import { Store } from '../../stores';
import { toValidOrThrow, ValidStore } from '../../stores/questionnaire/stores';

export const pullQuestionnaire = (appStore: Store): ValidStore => (
    toValidOrThrow(appStore.questionnaireInStore)
);
