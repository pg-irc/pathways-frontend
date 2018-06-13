import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, Props, renderSavedTask } from './task_list';
import { Actions } from './task';
import { Store } from '../../application/store';
import { selectAllSavedTasks } from '../../selectors/tasks';
import * as stores from '../../stores/tasks';
import { selectLocale } from '../../selectors/locale';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';

const mapStateToProps = (store: Store): Props => ({
    tasks: selectAllSavedTasks(selectLocale(store), store.applicationState.tasksInStore),
    taskRenderer: renderSavedTask,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    removeFromSavedList: (taskId: stores.Id): stores.RemoveFromSavedListAction => dispatch(stores.removeFromSavedList(taskId)),
    toggleCompleted: (taskUserSettingsId: stores.Id): stores.ToggleCompletedAction => dispatch(stores.toggleCompleted(taskUserSettingsId)),
    toggleStarred: (taskUserSettingsId: stores.Id): stores.ToggleStarredAction => dispatch(stores.toggleStarred(taskUserSettingsId)),
    shareTask: (): stores.ShareAction => dispatch(stores.share()),
    goToTaskDetail: (taskId: stores.Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
});

export const ConnectedSavedTasks = connect(mapStateToProps, mapDispatchToProps)(Component);
