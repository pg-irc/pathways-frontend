import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../tasks/task_list_component';
import { Store } from '../../stores';
import { MyPlanComponent, MyPlanProps } from './my_plan_component';
import { selectRecommendedTasks } from '../../selectors/tasks/select_recommended_tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { selectSavedTasks } from '../../selectors/tasks/select_saved_tasks';
import { selectCompletedTasks } from '../../selectors/tasks/select_completed_tasks';

const mapStateToProps = (store: Store): MyPlanProps => ({
    savedTasks: selectSavedTasks(store),
    recommendedTasks: selectRecommendedTasks(store),
    completedTasks: selectCompletedTasks(store),
});

const mapDispatchToProps = (dispatch: Dispatch<AddToSavedListAction>): TaskListActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const MyPlanConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyPlanComponent);