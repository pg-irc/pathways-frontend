import { Dispatch } from 'redux';
import { Store } from '../../application/store';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent } from './task_detail';
import { TaskServices, selectTaskServices, createRelatedServicesQueryFromTask } from '../../selectors/services';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { connect } from 'react-redux';
import { Task, selectCurrentTask } from '../../selectors/tasks';
import { SetArticleDetailPageAction, setArticleDetailPage,
         SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';
import { ArticleListItemActions } from '../articles/article_list_item';
import { TaskListItemActions } from './task_list_item';

interface StateProps extends TaskDetailProps {
    readonly searchQuery: string;
    readonly taskServices: TaskServices;
}

function mapStateToProps(store: Store): StateProps {
    const task: Task  = selectCurrentTask(store);
    return {
        task: task,
        savedTasks: store.applicationState.tasksInStore.savedTasksList,
        searchQuery: createRelatedServicesQueryFromTask(task),
        taskServices: selectTaskServices(task.id, store),
    };
}

interface Actions {
    readonly requestUpdateTaskServices: (task: Task, query: string) => UpdateTaskServicesAsync.Request;
}

type DispatchProps = Actions & TaskListItemActions & ArticleListItemActions;

function mapDispatchToProps(dispatch: Dispatch<Store>): DispatchProps {
    return {
        goToArticleDetail: (articleId: Id): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
        goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
        addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
        requestUpdateTaskServices: (task: Task, query: string): UpdateTaskServicesAsync.Request => {
            return dispatch(updateTaskServicesAsync.request(task.id, query));
        },
    };
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps): TaskDetailProps & TaskDetailActions {
    return {
        task: stateProps.task,
        savedTasks: stateProps.savedTasks,
        taskServices: stateProps.taskServices,
        goToArticleDetail: dispatchProps.goToArticleDetail,
        goToTaskDetail: dispatchProps.goToTaskDetail,
        addToSavedList: dispatchProps.addToSavedList,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(stateProps.task, stateProps.searchQuery);
        },
    };
}

export const TaskDetailConnectedComponent =
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
