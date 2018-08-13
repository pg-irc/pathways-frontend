import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListItemActions } from '../tasks/task_list_item';
import { Store } from '../../stores';
import { MyPlanComponent, MyPlanProps } from './my_plan';
import { selectRecommendedTasks } from '../../selectors/tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { selectSavedTasks } from '../../selectors/tasks/select_saved_tasks';
import { selectCompletedTasks } from '../../selectors/tasks/select_completed_tasks';

const mapStateToProps = (store: Store): MyPlanProps => ({
    savedTasks: selectSavedTasks(store),
    recommendedTasks: selectRecommendedTasks(store),
    completedTasks: selectCompletedTasks(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const MyPlanConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyPlanComponent);