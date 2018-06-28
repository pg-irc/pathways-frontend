import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { TaskDetailComponent, TaskDetailProps, TaskDetailActions } from './task_detail';
import { Id } from '../../stores/tasks';
import { SetArticleDetailPageAction, setArticleDetailPage } from '../../stores/page_switcher';
import { selectCurrentTask } from '../../selectors/tasks';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';
import { selectAllSavedTasks } from '../../selectors/tasks';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { selectLocale } from '../../selectors/locale';

const mapStateToProps = (store: Store): TaskDetailProps => ({
    task: selectCurrentTask(store),
    savedTasks: selectAllSavedTasks(selectLocale(store), store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskDetailActions => ({
    goToArticleDetail: (articleId: Id): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
    goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const TaskDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent);
