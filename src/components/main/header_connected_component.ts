import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { HeaderProps, HeaderActions, HeaderComponent } from './header_component';
import {
    Id as TopicId, UnbookmarkTopicAction, BookmarkTopicAction,
    bookmarkTopic, unbookmarkTopic,
} from '../../stores/topics';
import { pickBookmarkedTopicIds } from '../../selectors/topics/pick_bookmarked_topic_ids';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (store: Store): HeaderProps => ({
    savedTasksIdList: pickBookmarkedTopicIds(store),
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
});

type DispatchActions = BookmarkTopicAction | UnbookmarkTopicAction | BookmarkServiceAction | UnbookmarkServiceAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): HeaderActions => ({
    bookmarkTopic: (topicId: TopicId): BookmarkTopicAction => dispatch(bookmarkTopic(topicId)),
    unbookmarkTopic: (topicId: TopicId): UnbookmarkTopicAction => dispatch(unbookmarkTopic(topicId)),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => dispatch(bookmarkService(service)),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => dispatch(unbookmarkService(service)),
});

export const HeaderConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
