import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { TasksAddedProps, TasksAddedActions, TasksAddedComponent } from './tasks_added_component';

const mapStateToProps = (_: Store): TasksAddedProps => ({
});

const mapDispatchToProps = (_: Dispatch<Store>): TasksAddedActions => ({
});

export const TasksAddedConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TasksAddedComponent);
