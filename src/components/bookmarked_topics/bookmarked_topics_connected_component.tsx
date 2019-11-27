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
import { RouterProps } from '../../application/routing';

type Props = BookmarkedTopicsProps & RouterProps;

const mapStateToProps = (store: Store, ownProps: RouterProps): Props => ({
    bookmarkedServices: selectSavedServices(store),
    bookmarkedTopics: selectSavedTopics(store),
    currentPath: ownProps.location.pathname,
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
});

export type ServiceDispatchActions = AddServiceToSavedListAction | RemoveServiceFromSavedListAction;
export type ListActions = TaskListActions & ServiceListItemActions;
export type TopicDispatchActions = AddToSavedListAction | RemoveFromSavedListAction;
type DispatchActions = ServiceDispatchActions | TopicDispatchActions;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): ListActions => ({
    addServiceToSavedList: (service: HumanServiceData): AddServiceToSavedListAction => dispatch(addServiceToSavedListAction(service)),
    removeServiceFromSavedList: (service: HumanServiceData): RemoveServiceFromSavedListAction => dispatch(removeServiceFromSavedListAction(service)),
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const BookmarkedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarkedTopicsComponent);