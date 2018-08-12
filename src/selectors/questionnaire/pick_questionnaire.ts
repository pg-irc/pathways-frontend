import { Store } from '../../stores';
import { toValidOrThrow, ValidStore as QuestionnaireStore } from '../../stores/questionnaire/stores';

export const pickQuestionnaire = (appStore: Store): QuestionnaireStore => (
    toValidOrThrow(appStore.questionnaireInStore)
);
