import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HeaderProps, HeaderActions, HeaderComponent } from './header_component';
import { selectLocale } from '../../selectors/locale/select_locale';
import {
    Id as TopicId, UnbookmarkTopicAction, BookmarkTopicAction,
    bookmarkTopic, unbookmarkTopic,
} from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';

const mapStateToProps = (store: Store): HeaderProps => ({
    currentLocale: selectLocale(store),
    savedTasksIdList: pickBookmarkedTopicIds(store),
});

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): HeaderActions => ({
    bookmarkTopic: (topicId: TopicId): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: TopicId): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
});

export const HeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
