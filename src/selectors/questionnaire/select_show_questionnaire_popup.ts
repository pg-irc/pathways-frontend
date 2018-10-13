import { Store } from '../../stores';
import { pickQuestionnaire } from './pick_questionnaire';
import { QuestionnaireRouteState } from '../../fixtures/types/questionnaire';

export const selectShowQuestionnairePopup = (appStore: Store): boolean => (
    pickQuestionnaire(appStore).questionnaireRouteState === QuestionnaireRouteState.ShowQuestionnairePopup
);
