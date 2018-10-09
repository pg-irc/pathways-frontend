import { Store } from '../../stores';
import { pullQuestionnaire } from './pull_questionnaire';
import { State } from '../../fixtures/types/questionnaire';

export const selectIsPopupNeeded = (appStore: Store): boolean => (
    pullQuestionnaire(appStore).state === State.PopupNeeded
);
