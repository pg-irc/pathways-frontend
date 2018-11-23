import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { TasksAddedProps, TasksAddedActions, TasksAddedComponent } from './tasks_added_component';
import { selectShowQuestionnairePopup } from '../../selectors/questionnaire/select_show_questionnaire_popup';

const mapStateToProps = (store: Store): TasksAddedProps => ({
    showQuestionnairePopup: selectShowQuestionnairePopup(store),
});

const mapDispatchToProps = (_: Dispatch): TasksAddedActions => ({
});

export const TasksAddedConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TasksAddedComponent);
