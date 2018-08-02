import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListItemActions } from '../tasks/task_list_item';
import { Store } from '../../stores';
import { MyPlanComponent, MyPlanProps } from './my_plan';
import { selectSavedTasks, selectRecommendedTasks, selectCompletedTasks } from '../../selectors/tasks';
import { Id, AddToSavedListAction, addToSavedList } from '../../stores/tasks';

const mapStateToProps = (store: Store): MyPlanProps => ({
    savedTasks: selectSavedTasks(store),
    recommendedTasks: selectRecommendedTasks(store),
    completedTasks: selectCompletedTasks(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const MyPlanConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyPlanComponent);