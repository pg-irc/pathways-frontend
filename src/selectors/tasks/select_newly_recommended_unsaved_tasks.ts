import { Task } from './task';
import { Store } from '../../stores';
import { isQuestionnairePopupShown } from '../questionnaire/is_questionnaire_popup_shown';
import { computeNewlyRecommendedUnsavedTasks } from './compute_newly_recommended_unsaved_tasks';

export const selectNewlyRecommendedUnsavedTasks = (appStore: Store): ReadonlyArray<Task> => (
    isQuestionnairePopupShown(appStore) ? computeNewlyRecommendedUnsavedTasks(appStore) : []
);
