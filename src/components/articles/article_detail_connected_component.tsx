import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ArticleDetailComponent, ArticleDetailProps } from './article_detail';
import { TaskListItemActions } from '../tasks/task_list_item';
import { Id } from '../../stores/articles';
import { selectArticle } from '../../selectors/articles';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ArticleDetailProps => ({
    article: selectArticle(store, ownProps),
    savedTasks: store.tasksInStore.savedTasksList,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
