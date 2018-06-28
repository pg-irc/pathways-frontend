import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListComponent, TaskListProps, TaskListActions } from './task_list';
import { Store } from '../../application/store';
import { selectAllSavedTasks } from '../../selectors/tasks';
import * as stores from '../../stores/tasks';
import { selectLocale } from '../../selectors/locale';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';

const mapStateToProps = (store: Store): TaskListProps => ({
    tasks: selectAllSavedTasks(selectLocale(store), store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListActions => ({
    goToTaskDetail: (taskId: stores.Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
});

export const ConnectedSavedTasks = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
