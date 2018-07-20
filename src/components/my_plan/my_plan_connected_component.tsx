import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../tasks/task_list';
import { Store } from '../../application/store';
import { MyPlanComponent, MyPlanProps } from './my_plan';
import { selectAllSavedTasks, selectRecommendedTasks } from '../../selectors/tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';

const mapStateToProps = (store: Store): MyPlanProps => ({
    savedTasks: selectAllSavedTasks(store),
    recommendedTasks: selectRecommendedTasks(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const MyPlanConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyPlanComponent);