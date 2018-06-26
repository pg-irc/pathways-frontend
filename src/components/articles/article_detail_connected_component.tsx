import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { ArticleDetailComponent, ArticleDetailProps, ArticleDetailActions } from './article_detail';
import { Id } from '../../stores/articles';
import { SetArticleDetailPageAction, setArticleDetailPage } from '../../stores/page_switcher';
import { selectCurrentArticle } from '../../selectors/articles';

const mapStateToProps = (store: Store): ArticleDetailProps => ({
    article: selectCurrentArticle(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): ArticleDetailActions => ({
    goToArticleDetail: (articleId: Id): SetArticleDetailPageAction => dispatch(setArticleDetailPage(articleId)),
});

export const ArticleDetailConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailComponent);
