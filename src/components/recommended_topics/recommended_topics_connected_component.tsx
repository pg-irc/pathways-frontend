import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { RecommendedTopicsComponent, RecommendedTopicsProps } from './recommended_topics_component';
import { selectRecommendedTopics } from '../../selectors/topics/select_recommended_topics';
import { Id, AddToSavedListAction, addToSavedList, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';
import { getIdsOfChosenAnswers } from '../../selectors/questionnaire/get_ids_of_chosen_answers';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    savedTopicsIdList: pickSavedTopicIds(store),
    recommendedTopics: selectRecommendedTopics(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions => ({
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);