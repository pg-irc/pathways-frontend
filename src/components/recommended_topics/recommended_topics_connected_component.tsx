import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { RecommendedTopicsComponent, RecommendedTopicsProps } from './recommended_topics_component';
import { selectRecommendedTopics } from '../../selectors/topics/select_recommended_topics';
import { Id, AddTopicToSavedListAction, addTopicToSavedList, RemoveTopicFromSavedListAction, removeTopicFromSavedList } from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';
import { getIdsOfChosenAnswers } from '../../selectors/questionnaire/get_ids_of_chosen_answers';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    savedTopicsIdList: pickSavedTopicIds(store),
    recommendedTopics: selectRecommendedTopics(store),
});

type DispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions => ({
    addTopicToSavedList: (topicId: Id): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeTopicFromSavedList: (topicId: Id): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);