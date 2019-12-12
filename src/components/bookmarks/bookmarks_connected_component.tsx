import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarksComponent, BookmarksProps } from './bookmarks_component';
import { Id, RemoveTopicFromSavedListAction, removeTopicFromSavedList, AddTopicToSavedListAction, addTopicToSavedList } from '../../stores/topics';
import { selectSavedTopics } from '../../selectors/topics/select_saved_topics';
import { selectBookmarkedServices } from '../../selectors/services/select_bookmarked_services';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { ServiceListItemActions } from '../services/service_list_item_component';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (store: Store): BookmarksProps => ({
    bookmarkedServices: selectBookmarkedServices(store),
    bookmarkedTopics: selectSavedTopics(store),
});

export type ServiceDispatchActions = BookmarkServiceAction | UnbookmarkServiceAction;
export type ListActions = TaskListActions & ServiceListItemActions;
export type TopicDispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction;
type DispatchActions = ServiceDispatchActions | TopicDispatchActions;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ListActions => ({
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
    addTopicToSavedList: (topicId: Id): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeTopicFromSavedList: (topicId: Id): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
});

export const BookmarksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent);