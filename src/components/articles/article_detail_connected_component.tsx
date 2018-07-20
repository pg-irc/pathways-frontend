import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ArticleDetailComponent, ArticleDetailProps } from './article_detail';
import { TaskListItemActions } from '../tasks/task_list_item';
import { Id } from '../../stores/articles';
import { selectArticleByPathParameter } from '../../selectors/articles';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ArticleDetailProps => ({
    article: selectArticleByPathParameter(store, ownProps.match.params.articleId),
    savedTasks: store.applicationState.tasksInStore.savedTasksList,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
