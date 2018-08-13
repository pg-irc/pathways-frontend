import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { pullQuestionnaire } from './pull_questionnaire';

export const selectActiveQuestion = (appStore: Store): model.Id => (
    pullQuestionnaire(appStore).activeQuestion
);
