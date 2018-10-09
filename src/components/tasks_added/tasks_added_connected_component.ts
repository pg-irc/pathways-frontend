import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { TasksAddedProps, TasksAddedActions, TasksAddedComponent } from './tasks_added_component';
import { selectIsPopupNeeded } from '../../selectors/questionnaire/select_is_popup_requested';

const mapStateToProps = (store: Store): TasksAddedProps => ({
    isPopupNeeded: selectIsPopupNeeded(store),
});

const mapDispatchToProps = (_: Dispatch<Store>): TasksAddedActions => ({
});

export const TasksAddedConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TasksAddedComponent);
