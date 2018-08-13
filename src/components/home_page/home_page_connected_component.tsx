import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HomePageProps, HomePageComponent } from './home_page';
import { selectExploreSectionList } from '../../selectors/explore/select_explore_section_list';
import { selectRecommendedTasks } from '../../selectors/tasks/select_recommended_tasks';
import { Id as TaskId } from '../../stores/tasks';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { withI18n } from '@lingui/react';
import { TaskListItemActions } from '../tasks/task_list_item';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';

const mapStateToProps = (store: Store): HomePageProps => ({
    tasks: selectRecommendedTasks(store),
    sections: selectExploreSectionList(store),
    savedTasksIdList: pickSavedTaskIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: TaskId): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const HomePageConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(HomePageComponent));
