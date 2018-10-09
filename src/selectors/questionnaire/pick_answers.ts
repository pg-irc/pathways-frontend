import { Store } from '../../stores';
import { AnswersMap } from '../../stores/questionnaire';
import { pickQuestionnaire } from './pick_questionnaire';

export const pickAnswers = (appStore: Store): AnswersMap => (
    pickQuestionnaire(appStore).answers
);
