import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ArticleDetailComponent, ArticleDetailProps, ArticleDetailActions } from './article_detail';
import { Id } from '../../stores/articles';
import { SetArticleDetailPageAction, setArticleDetailPage } from '../../stores/page_switcher';
import { selectArticleByPathParameter } from '../../selectors/articles';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';

const mapStateToProps = (store: Store, ownProps: RouterProps): ArticleDetailProps => ({
    article: selectArticleByPathParameter(store, ownProps.match.params.articleId),
    savedTasks: store.applicationState.tasksInStore.savedTasksList,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ArticleDetailActions => ({
    goToArticleDetail: (articleId: Id): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
    goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
