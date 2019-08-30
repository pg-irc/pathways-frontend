import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { RecommendedTopicsComponent, RecommendedTopicsProps, LocaleActions } from './recommended_topics_component';
import { selectRecommendedTopics } from '../../selectors/topics/select_recommended_topics';
import { Id, AddToSavedListAction, addToSavedList, RemoveFromSavedListAction, removeFromSavedList } from '../../stores/topics';
import { pickSavedTopicIds } from '../../selectors/topics/pick_saved_topic_ids';
import { getIdsOfChosenAnswers } from '../../selectors/questionnaire/get_ids_of_chosen_answers';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { selectLocale } from '../../selectors/locale/select_locale';
// import { selectShowOnboarding } from '../../selectors/onboarding/select_show_onboarding';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    savedTopicsIdList: pickSavedTopicIds(store),
    recommendedTopics: selectRecommendedTopics(store),
    currentLocale: selectLocale(store),
    availableLocales: selectAvailableLocales(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction | SaveLocaleRequestAction;
type NewActions = TaskListActions | LocaleActions;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): NewActions => ({
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
    setLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);