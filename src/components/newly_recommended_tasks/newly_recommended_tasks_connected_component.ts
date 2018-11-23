import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectNewlyRecommendedTasks } from '../../selectors/tasks/select_newly_recommended_tasks';
import { Id } from '../../stores/tasks';
import { SaveTheseTasksToMyPlanAction, saveTheseTasksToMyPlan } from '../../stores/tasks/actions';
import { DismissNewlyAddedTasksPopupAction, dismissNewlyAddedTasksPopup } from '../../stores/questionnaire/actions';
import {
    NewlyRecommendedTasksComponentProps,
    NewlyRecommendedTasksComponentActions,
    NewlyRecommendedTasksComponent,
} from './newly_recommended_tasks_component';
import { selectShowQuestionnairePopup } from '../../selectors/questionnaire/select_show_questionnaire_popup';

const mapStateToProps = (store: Store): NewlyRecommendedTasksComponentProps => ({
    showQuestionnairePopup: selectShowQuestionnairePopup(store),
    newlyRecommendedTasks: selectNewlyRecommendedTasks(store),
});

type DispatchActions = SaveTheseTasksToMyPlanAction | DismissNewlyAddedTasksPopupAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): NewlyRecommendedTasksComponentActions => ({
    saveToMyPlan: (tasks: ReadonlyArray<Id>): SaveTheseTasksToMyPlanAction => dispatch(saveTheseTasksToMyPlan(tasks)),
    dismissPopup: (): DismissNewlyAddedTasksPopupAction => dispatch(dismissNewlyAddedTasksPopup()),
});

export const NewlyRecommendedTasksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewlyRecommendedTasksComponent);
