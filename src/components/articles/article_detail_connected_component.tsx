import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ArticleDetailComponent, ArticleDetailProps, ArticleDetailActions } from './article_detail';
import { Id } from '../../stores/articles';
import { SetArticleDetailPageAction, setArticleDetailPage } from '../../stores/page_switcher';
import { selectCurrentArticle } from '../../selectors/articles';
import { SetTaskDetailPageAction, setTaskDetailPage } from '../../stores/page_switcher';
import { selectAllSavedTasks } from '../../selectors/tasks';
import { AddToSavedListAction, addToSavedList } from '../../stores/tasks';
import { selectLocale } from '../../selectors/locale';

const mapStateToProps = (store: Store): ArticleDetailProps => ({
    article: selectCurrentArticle(store),
    savedTasks: selectAllSavedTasks(selectLocale(store), store.applicationState.tasksInStore),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ArticleDetailActions => ({
    goToArticleDetail: (articleId: Id): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
    goToTaskDetail: (taskId: Id): SetTaskDetailPageAction => dispatch(setTaskDetailPage(taskId)),
    addToSavedList: (taskId: Id): AddToSavedListAction => dispatch(addToSavedList(taskId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
