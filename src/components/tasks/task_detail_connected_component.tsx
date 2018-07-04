import { Dispatch } from 'redux';
import { Store } from '../../application/store';
import { updateTaskServicesAsync, UpdateTaskServicesAsync } from '../../stores/services';
import { TaskDetailProps, TaskDetailActions, TaskDetailComponent, TaskServiceUpdater } from './task_detail';
import { TaskServices, selectTaskServices, createRelatedServicesQueryFromTask } from '../../selectors/services';
import { Id as TaskId, AddToSavedListAction, addToSavedList, ToggleCompletedAction,
         toggleCompleted, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/tasks';
import { Id as ArticleId } from '../../stores/articles';
import { connect } from 'react-redux';
import { Task, selectCurrentTask } from '../../selectors/tasks';
import { SetArticleDetailPageAction, setArticleDetailPage,
         SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';

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

interface DispatchProps extends TaskDetailActions {
    readonly requestUpdateTaskServices: (task: Task, query: string) => UpdateTaskServicesAsync.Request;
}

function mapDispatchToProps(dispatch: Dispatch<Store>): DispatchProps {
    return {
        goToArticleDetail: (articleId: ArticleId): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
        goToTaskDetail: (taskId: ArticleId): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
        addToSavedList: (taskId: ArticleId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
        removeFromSavedList: (taskId: TaskId): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
        toggleCompleted: (taskId: TaskId): ToggleCompletedAction => dispatch(toggleCompleted(taskId)),
        requestUpdateTaskServices: (task: Task, query: string): UpdateTaskServicesAsync.Request => {
            return dispatch(updateTaskServicesAsync.request(task.id, query));
        },
    };
}

type ComponentProps = TaskDetailProps & TaskDetailActions & TaskServiceUpdater;

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps): ComponentProps {
    return {
        task: stateProps.task,
        savedTasks: stateProps.savedTasks,
        taskServices: stateProps.taskServices,
        goToArticleDetail: dispatchProps.goToArticleDetail,
        goToTaskDetail: dispatchProps.goToTaskDetail,
        addToSavedList: dispatchProps.addToSavedList,
        removeFromSavedList: dispatchProps.removeFromSavedList,
        toggleCompleted: dispatchProps.toggleCompleted,
        requestUpdateTaskServices: (): UpdateTaskServicesAsync.Request => {
            return dispatchProps.requestUpdateTaskServices(stateProps.task, stateProps.searchQuery);
        },
    };
}

export const TaskDetailConnectedComponent =
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskDetailComponent);
