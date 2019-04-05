import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TaskListActions } from '../topics/task_list_component';
import { Store } from '../../stores';
import { BookmarkedTopicsComponent, BookmarkedTopicsProps } from './bookmarked_topics_component';
import { Id, RemoveFromSavedListAction, removeFromSavedList, AddToSavedListAction, addToSavedList } from '../../stores/topics';
import { selectSavedTasks } from '../../selectors/topics/select_saved_tasks';

const mapStateToProps = (store: Store): BookmarkedTopicsProps => ({
    bookmarkedTopics: selectSavedTasks(store),
});

type DispatchActions = AddToSavedListAction | RemoveFromSavedListAction;

const mapDispatchToProps = (dispatch: Dispatch<DispatchActions>): TaskListActions => ({
    addToSavedList: (topicId: Id): AddToSavedListAction => dispatch(addToSavedList(topicId)),
    removeFromSavedList: (topicId: Id): RemoveFromSavedListAction => dispatch(removeFromSavedList(topicId)),
});

export const BookmarkedTopicsConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(BookmarkedTopicsComponent);