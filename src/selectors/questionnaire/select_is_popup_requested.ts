import { Store } from '../../stores';
import { pickQuestionnaire } from './pick_questionnaire';
import { State } from '../../fixtures/types/questionnaire';

export const selectIsPopupNeeded = (appStore: Store): boolean => (
    pickQuestionnaire(appStore).state === State.PopupNeeded
);
