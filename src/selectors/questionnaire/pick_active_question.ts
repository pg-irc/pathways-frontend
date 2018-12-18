import { Store } from '../../stores';
import { Id } from '../../stores/questionnaire';
import { pickQuestionnaire } from './pick_questionnaire';

export const pickActiveQuestion = (appStore: Store): Id => (
    pickQuestionnaire(appStore).activeQuestion
);
