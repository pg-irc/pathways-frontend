import { Store } from '../../stores';
import { Id } from '../../stores/questionnaire';
import { toValidOrThrow, ValidStore as QuestionnaireStore } from '../../stores/questionnaire/stores';
import { getIdsOfChosenAnswers } from './get_ids_of_chosen_answers';

export const selectIdsOfChosenAnswers = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfChosenAnswers(pickQuestionnaire(appStore).answers)
);

const pickQuestionnaire = (appStore: Store): QuestionnaireStore => (
    toValidOrThrow(appStore.questionnaireInStore)
);
