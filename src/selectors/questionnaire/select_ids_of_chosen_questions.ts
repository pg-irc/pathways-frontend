import { Store } from '../../stores';
import { Id } from '../../stores/questionnaire';
import { getIdsOfChosenAnswers } from './get_ids_of_chosen_answers';
import { pickQuestionnaire } from './pick_questionnaire';

export const selectIdsOfChosenAnswers = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfChosenAnswers(pickQuestionnaire(appStore).answers)
);
