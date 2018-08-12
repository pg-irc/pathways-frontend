import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { toValidOrThrow } from '../../stores/questionnaire/stores';

export const selectActiveQuestion = (appStore: Store): model.Id => (
    toValidOrThrow(appStore.questionnaireInStore).activeQuestion
);
