import { Store } from '../../stores';
import { pickQuestionnaire } from './pick_questionnaire';
import { QuestionnaireRouteState } from '../../fixtures/types/questionnaire';

export const getShowQuestionnairePopup = (appStore: Store): boolean => (
    pickQuestionnaire(appStore).questionnaireRouteState === QuestionnaireRouteState.ShowQuestionnairePopup
);
