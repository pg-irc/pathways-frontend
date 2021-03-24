import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTopicsForCurrentExploreSection } from '../../selectors/topics/select_topics_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { bookmarkTopic, BookmarkTopicAction, Id, UnbookmarkTopicAction, unbookmarkTopic } from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    topics: selectTopicsForCurrentExploreSection(store, ownProps),
    bookmarkedTopics: pickBookmarkedTopicIds(store),
});

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction | OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
