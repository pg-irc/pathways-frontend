import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTopicForCurrentExploreSection } from '../../selectors/topics/select_topic_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { bookmarkTopic, BookmarkTopicAction, Id, UnbookmarkTopicAction, unbookmarkTopic } from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { OpenHeaderMenuAction, openHeaderMenu, saveExploreDetailScrollOffset, SaveExploreDetailScrollOffsetAction } from '../../stores/user_experience/actions';
import { SaveTaskListScrollOffsetActions } from '../topics/task_list_component';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    topics: selectTopicForCurrentExploreSection(store, ownProps),
    bookmarkedTopics: pickBookmarkedTopicIds(store),
    // To do: Find a way to differentiate between explore sections and determine which offset they have
    scrollOffset: 0,
});

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction | OpenHeaderMenuAction | SaveExploreDetailScrollOffsetAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    saveScrollOffset: (offset: number): SaveTaskListScrollOffsetActions => dispatch(saveExploreDetailScrollOffset(offset)),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
