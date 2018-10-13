import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { pickQuestionnaire } from './pick_questionnaire';

export const selectActiveQuestion = (appStore: Store): model.Id => (
    pickQuestionnaire(appStore).activeQuestion
);
