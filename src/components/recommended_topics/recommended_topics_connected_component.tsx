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
import { selectAlerts } from '../../selectors/content/selectAlerts';
import { selectShowLinkAlerts } from '../../selectors/user_profile/select_show_link_alerts';
import { AnalyticsLinkPressedAction, analyticsLinkPressed, AnalyticsLinkProps } from '../../stores/analytics';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { hideLinkAlerts, HideLinkAlertsAction } from '../../stores/user_profile';
import { pickRegion } from '../../selectors/region/pick_region';

const mapStateToProps = (store: Store): RecommendedTopicsProps => ({
    hasChosenAnswers: getIdsOfChosenAnswers(pickAnswers(store)).length > 0,
    bookmarkedTopics: pickBookmarkedTopicIds(store),
    recommendedTopics: selectRecommendedTopics(store),
    alerts: selectAlerts(store),
    showLinkAlerts: selectShowLinkAlerts(store),
    region: pickRegion(store),
});

type Actions = BookmarkTopicAction | UnbookmarkTopicAction | OpenHeaderMenuAction | AnalyticsLinkPressedAction | HideLinkAlertsAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): RecommendedTopicsActions & TaskListActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    hideLinkAlerts: (): HideLinkAlertsAction => dispatch(hideLinkAlerts()),
    analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps): AnalyticsLinkPressedAction =>
        dispatch(analyticsLinkPressed(analyticsLinkProps)),
});

export const RecommendedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RecommendedTopicsComponent);
