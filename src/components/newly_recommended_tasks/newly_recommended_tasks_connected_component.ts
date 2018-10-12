import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectNewlyRecommendedTasks } from '../../selectors/tasks/select_newly_recommended_tasks';
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

const mapDispatchToProps = (_: Dispatch<Store>): NewlyRecommendedTasksComponentActions => ({
});

export const NewlyRecommendedTasksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewlyRecommendedTasksComponent);
