import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarksComponent, BookmarksProps, BookmarkActions } from './bookmarks_component';
import { Id, UnbookmarkTopicAction, unbookmarkTopic, BookmarkTopicAction, bookmarkTopic } from '../../stores/topics';
import { selectBookmarkedTopics } from '../../selectors/topics/select_bookmarked_topics';
import { selectBookmarkedServices } from '../../selectors/services/select_bookmarked_services';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { ServiceListItemActions } from '../services/service_list_item_component';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (store: Store): BookmarksProps => ({
    bookmarkedServices: selectBookmarkedServices(store),
    bookmarkedTopics: selectBookmarkedTopics(store),
});

type ServiceDispatchActions = BookmarkServiceAction | UnbookmarkServiceAction;
type TopicDispatchActions = BookmarkTopicAction | UnbookmarkTopicAction;
type Actions = ServiceDispatchActions | TopicDispatchActions | OpenHeaderMenuAction;

export type ListActions = TaskListActions & ServiceListItemActions & BookmarkActions;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): ListActions => ({
    bookmarkTopic: (topicId: Id): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: Id): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    openHeaderMenu: (): OpenHeaderMenuAction => dispatch(openHeaderMenu()),
});

export const BookmarksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent);