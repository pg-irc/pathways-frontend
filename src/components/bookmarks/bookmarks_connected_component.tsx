import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarksComponent, BookmarksProps } from './bookmarks_component';
import { Id, RemoveTopicFromSavedListAction, removeTopicFromSavedList, AddTopicToSavedListAction, addTopicToSavedList } from '../../stores/topics';
import { selectSavedTopics } from '../../selectors/topics/select_saved_topics';
import { selectSavedServices } from '../../selectors/services/selected_saved_services';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction, addServiceToSavedListAction, removeServiceFromSavedListAction } from '../../stores/services/actions';
import { ServiceListItemActions } from '../services/service_list_item_component';
import { HumanServiceData } from '../../validation/services/types';
import { getSavedServicesIds } from '../../selectors/services/get_saved_services_ids';

const mapStateToProps = (store: Store): BookmarksProps => ({
    bookmarkedServices: selectSavedServices(store),
    savedServicesIds: getSavedServicesIds(store),
    bookmarkedTopics: selectSavedTopics(store),
});

export type ServiceDispatchActions = AddServiceToSavedListAction | RemoveServiceFromSavedListAction;
export type ListActions = TaskListActions & ServiceListItemActions;
export type TopicDispatchActions = AddTopicToSavedListAction | RemoveTopicFromSavedListAction;
type DispatchActions = ServiceDispatchActions | TopicDispatchActions;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ListActions => ({
    addServiceToSavedList: (service: HumanServiceData): AddServiceToSavedListAction => dispatch(addServiceToSavedListAction(service)),
    removeServiceFromSavedList: (service: HumanServiceData): RemoveServiceFromSavedListAction => dispatch(removeServiceFromSavedListAction(service)),
    addTopicToSavedList: (topicId: Id): AddTopicToSavedListAction => dispatch(addTopicToSavedList(topicId)),
    removeTopicFromSavedList: (topicId: Id): RemoveTopicFromSavedListAction => dispatch(removeTopicFromSavedList(topicId)),
});

export const BookmarksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent);