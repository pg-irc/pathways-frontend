import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ExploreDetailComponent, ExploreDetailProps, ExploreDetailActions } from './explore_detail_component';
import { selectCurrentExploreSection } from '../../selectors/explore/select_current_explore_section';
import { selectTopicForCurrentExploreSection } from '../../selectors/topics/select_topic_for_current_explore_section';
import { RouterProps } from '../../application/routing';
import { bookmarkTopic, BookmarkTopicAction, Id, UnbookmarkTopicAction, unbookmarkTopic } from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { OpenHeaderMenuAction, openHeaderMenu, saveTopicServicesOffset, SaveTopicServicesOffsetAction } from '../../stores/user_experience/actions';
import { SaveTaskListOffsetActions } from '../topics/task_list_component';

const mapStateToProps = (store: Store, ownProps: RouterProps): ExploreDetailProps => ({
    section: selectCurrentExploreSection(store, ownProps),
    topics: selectTopicForCurrentExploreSection(store, ownProps),
    bookmarkedTopics: pickBookmarkedTopicIds(store),
});

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction | OpenHeaderMenuAction | SaveTopicServicesOffsetAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ExploreDetailActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    saveListOffset: (offset: number): SaveTaskListOffsetActions => dispatch(saveTopicServicesOffset(offset)),
});

export const ExploreDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ExploreDetailComponent);
