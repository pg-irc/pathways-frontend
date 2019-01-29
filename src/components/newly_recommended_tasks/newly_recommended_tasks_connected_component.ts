import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { computeNewlyRecommendedUnsavedTasks } from '../../selectors/tasks/compute_newly_recommended_unsaved_tasks';
import { Id } from '../../stores/tasks';
import { SaveTheseTasksToMyPlanAction, saveTheseTasksToMyPlan } from '../../stores/tasks/actions';
import { DismissNewlyAddedTasksPopupAction, dismissNewlyAddedTasksPopup } from '../../stores/questionnaire/actions';
import {
    NewlyRecommendedTasksComponentProps,
    NewlyRecommendedTasksComponentActions,
    NewlyRecommendedTasksComponent,
} from './newly_recommended_tasks_component';
import { getShowQuestionnairePopup } from '../../selectors/questionnaire/get_show_questionnaire_popup';

const mapStateToProps = (store: Store): NewlyRecommendedTasksComponentProps => ({
    showQuestionnairePopup: getShowQuestionnairePopup(store),
    newlyRecommendedUnsavedTasks: computeNewlyRecommendedUnsavedTasks(store),
});

type DispatchActions = SaveTheseTasksToMyPlanAction | DismissNewlyAddedTasksPopupAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): NewlyRecommendedTasksComponentActions => ({
    saveToMyPlan: (tasks: ReadonlyArray<Id>): SaveTheseTasksToMyPlanAction => dispatch(saveTheseTasksToMyPlan(tasks)),
    dismissPopup: (): DismissNewlyAddedTasksPopupAction => dispatch(dismissNewlyAddedTasksPopup()),
});

export const NewlyRecommendedTasksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewlyRecommendedTasksComponent);
