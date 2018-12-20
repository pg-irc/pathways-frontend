import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../tasks/task_list_component';
import { Store } from '../../stores';
import { RecommendedTopicsComponent, RecommendedTopicsProps } from './recommended_topics_component';
import { selectRecommendedTasks } from '../../selectors/tasks/select_recommended_tasks';
import { Id, AddToSavedListAction, addToSavedList, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/tasks';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';
import { getIdsOfChosenAnswers } from '../../selectors/questionnaire/get_ids_of_chosen_answers';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    savedTopicsIdList: pickSavedTaskIds(store),
    recommendedTopics: selectRecommendedTasks(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
    removeFromSavedList: (taskId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(taskId)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);