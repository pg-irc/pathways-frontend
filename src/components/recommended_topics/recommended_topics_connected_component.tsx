import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { RecommendedTopicsComponent, RecommendedTopicsProps, RecommendedTopicsActions } from './recommended_topics_component';
import { selectRecommendedTopics } from '../../selectors/topics/select_recommended_topics';
import { Id, BookmarkTopicAction, bookmarkTopic, UnbookmarkTopicAction, unbookmarkTopic } from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { getIdsOfChosenAnswers } from '../../selectors/questionnaire/get_ids_of_chosen_answers';
import { pickAnswers } from '../../selectors/questionnaire/pick_answers';
import { AnalyticsLinkPressedAction, analyticsLinkPressed } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    bookmarkedTopics: pickBookmarkedTopicIds(store),
    recommendedTopics: selectRecommendedTopics(store),
});

type Actions = BookmarkTopicAction | UnbookmarkTopicAction | OpenHeaderMenuAction | AnalyticsLinkPressedAction ;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): RecommendedTopicsActions & TaskListActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(currentPath, linkContext, linkType, linkValue)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);