import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { BookmarksComponent, BookmarksProps, BookmarkActions } from './bookmarks_component';
import { Id, UnbookmarkTopicAction, unbookmarkTopic, BookmarkTopicAction, bookmarkTopic } from '../../stores/topics';
import { selectBookmarkedTopics } from '../../selectors/topics/select_bookmarked_topics';
import { selectBookmarkedServices } from '../../selectors/services/select_bookmarked_services';
import { OpenHeaderMenuAction, openHeaderMenu, SaveBookmarkedTopicsScrollOffsetAction, saveBookmarkedTopicsScrollOffset } from '../../stores/user_experience/actions';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService, OpenServiceAction, openServiceDetail } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { selectBookmarksTab } from '../../selectors/user_experience/select_bookmarks_tab';
import { SaveBookmarkedServicesScrollOffsetAction, saveBookmarkedServicesScrollOffset, SaveBookmarksTabAction, saveBookmarksTab } from '../../stores/user_experience/actions';
import { selectBookmarkedServicesScrollOffset } from '../../selectors/user_experience/select_bookmarked_services_scroll_offset';
import { selectBookmarkedTopicsScrollOffset } from '../../selectors/user_experience/select_bookmarked_topics_scroll_offset';

const mapStateToProps = (store: Store): BookmarksProps => ({
    bookmarkedServices: selectBookmarkedServices(store),
    bookmarkedTopics: selectBookmarkedTopics(store),
    bookmarksTab: selectBookmarksTab(store),
    topicsScrollOffset: selectBookmarkedTopicsScrollOffset(store),
    servicesScrollOffset: selectBookmarkedServicesScrollOffset(store),
});

type ServiceDispatchActions = BookmarkServiceAction | UnbookmarkServiceAction;
type TopicDispatchActions = BookmarkTopicAction | UnbookmarkTopicAction;
type Actions =
    ServiceDispatchActions
    | TopicDispatchActions
    | OpenHeaderMenuAction
    | OpenServiceAction
    | SaveBookmarksTabAction
    | SaveBookmarkedTopicsScrollOffsetAction
    | SaveBookmarkedServicesScrollOffsetAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): BookmarkActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openServiceDetail: (service: HumanServiceData): OpenServiceAction => dispatch(openServiceDetail(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    setBookmarksTab: (index: number): SaveBookmarksTabAction => dispatch(saveBookmarksTab(index)),
    saveTopicsScrollOffset: (offset: number): SaveBookmarkedTopicsScrollOffsetAction => dispatch(saveBookmarkedTopicsScrollOffset(offset)),
    saveServicesScrollOffset: (offset: number): SaveBookmarkedServicesScrollOffsetAction => dispatch(saveBookmarkedServicesScrollOffset(offset)),
});

export const BookmarksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent);
