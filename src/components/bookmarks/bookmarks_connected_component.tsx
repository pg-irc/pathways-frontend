import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarksComponent, BookmarksProps, BookmarkActions } from './bookmarks_component';
import { Id, UnbookmarkTopicAction, unbookmarkTopic, BookmarkTopicAction, bookmarkTopic } from '../../stores/topics';
import { selectBookmarkedTopics } from '../../selectors/topics/select_bookmarked_topics';
import { selectBookmarkedServices } from '../../selectors/services/select_bookmarked_services';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService, OpenServiceAction, openServiceDetail } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { ServiceBookmarksActions } from './service_bookmarks_component';
import { selectBookmarksTab } from '../../selectors/bookmarks_tab/select_bookmarks_tab';
import { SetBookmarksTabAction, setBookmarksTab } from '../../stores/bookmarks_tab';
import { selectListOffset } from '../../selectors/list_offset.ts/select_list_offset';
import { SaveListOffsetAction, saveListOffset } from '../../stores/list_offset';

const mapStateToProps = (store: Store): BookmarksProps => ({
    bookmarkedServices: selectBookmarkedServices(store),
    bookmarkedTopics: selectBookmarkedTopics(store),
    bookmarksTab: selectBookmarksTab(store),
    listOffset: selectListOffset(store),
});

type ServiceDispatchActions = BookmarkServiceAction | UnbookmarkServiceAction;
type TopicDispatchActions = BookmarkTopicAction | UnbookmarkTopicAction;
type Actions =
    ServiceDispatchActions
    | TopicDispatchActions
    | OpenHeaderMenuAction
    | OpenServiceAction
    | SetBookmarksTabAction
    | SaveListOffsetAction;

export type ListActions = TaskListActions & ServiceBookmarksActions & BookmarkActions;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ListActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openServiceDetail: (service: HumanServiceData): OpenServiceAction => dispatch(openServiceDetail(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
    setBookmarksTab: (index: number): SetBookmarksTabAction => dispatch(setBookmarksTab(index)),
    saveListOffset: (offset: number): SaveListOffsetAction => dispatch(saveListOffset(offset)),
});

export const BookmarksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent);