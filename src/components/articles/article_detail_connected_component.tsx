import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { ArticleDetailComponent, ArticleDetailProps } from './article_detail';
import { TaskListItemActions } from '../tasks/task_list_item';
import { Id } from '../../stores/articles';
import { selectCurrentArticle } from '../../selectors/articles/select_current_article';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';
import { pickSavedTaskIds } from '../../selectors/tasks/pick_saved_task_ids';

const mapStateToProps = (store: Store, ownProps: RouterProps): ArticleDetailProps => ({
    article: selectCurrentArticle(store, ownProps),
    savedTasksIdList: pickSavedTaskIds(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): TaskListItemActions => ({
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
