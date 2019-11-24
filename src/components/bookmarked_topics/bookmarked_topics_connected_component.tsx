import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarkedTopicsComponent, BookmarkedTopicsProps } from './bookmarked_topics_component';
import { Id, RemoveFromSavedListAction, removeFromSavedList, AddToSavedListAction, addToSavedList } from '../../stores/topics';
import { selectSavedTopics } from '../../selectors/topics/select_saved_topics';
import { selectSavedServices } from '../../selectors/services/select_saved_services';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction, addServiceToSavedListAction, removeServiceFromSavedListAction } from '../../stores/services/actions';
import { ServiceListItemActions } from '../services/service_list_item_component';
import { HumanServiceData } from '../../validation/services/types';

const mapStateToProps = (store: Store): BookmarkedTopicsProps => ({
    bookmarkedServices: selectSavedServices(store),
    bookmarkedTopics: selectSavedTopics(store),
});

export type ServiceDispatchActions = AddServiceToSavedListAction | RemoveServiceFromSavedListAction;
export type TopicDispatchActions = AddToSavedListAction | RemoveFromSavedListAction;
type DispatchActions = ServiceDispatchActions | TopicDispatchActions;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions | ServiceListItemActions => ({
    addServiceToSavedList: (service: HumanServiceData): AddServiceToSavedListAction => dispatch(addServiceToSavedListAction(service)),
    removeServiceFromSavedList: (service: HumanServiceData): RemoveServiceFromSavedListAction => dispatch(removeServiceFromSavedListAction(service)),
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const BookmarkedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarkedTopicsComponent);