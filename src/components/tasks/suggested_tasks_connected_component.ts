import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListComponent, TaskListProps, TaskListActions } from './task_list';
import { TaskListItemStyleProps } from './task_list_item';
import { Store } from '../../application/store';
import { selectRecommendedTasks } from '../../selectors/tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';

const mapStateToProps = (store: Store, ownProps: TaskListItemStyleProps): TaskListProps => ({
    tasks: selectRecommendedTasks(store),
    listItemStyle: ownProps.listItemStyle,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListActions => ({
    goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const SuggestedTasksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
