import { Store } from '../../stores';
import { toValidOrThrow, ValidQuestionnaireStore } from '../../stores/questionnaire/stores';

export const pickQuestionnaire = (appStore: Store): ValidQuestionnaireStore => (
    toValidOrThrow(appStore.questionnaireInStore)
);
