import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListComponent, TaskListProps, TaskListActions } from './task_list';
import { TaskListItemStyles } from './task_list_item';
import { Store } from '../../application/store';
import { selectAllSuggestedTasks } from '../../selectors/tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { selectLocale } from '../../selectors/locale';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';

const mapStateToProps = (store: Store, ownProps: TaskListItemStyles): TaskListProps => ({
    tasks: selectAllSuggestedTasks(selectLocale(store), store.applicationState.tasksInStore),
    style: ownProps.style,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListActions => ({
    goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ConnectedSuggestedTasks = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
