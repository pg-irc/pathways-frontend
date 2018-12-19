import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../tasks/task_list_component';
import { Store } from '../../stores';
import { MyPlanComponent, MyPlanProps } from './my_plan_component';
import { selectRecommendedTasks } from '../../selectors/tasks/select_recommended_tasks';
import { Id, AddToSavedListAction, addToSavedList, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/tasks';
import { selectSavedTasks } from '../../selectors/tasks/select_saved_tasks';

const mapStateToProps = (store: Store): MyPlanProps => ({
    savedTasks: selectSavedTasks(store),
    recommendedTasks: selectRecommendedTasks(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
});

export const MyPlanConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyPlanComponent);