import React from 'react';
import { View } from 'native-base';
import { ArticleListItem } from '../../selectors/articles';
import { ArticleListItemComponent, ArticleListItemActions } from './article_list_item';
import R from 'ramda';

export interface ArticleListProps {
    readonly articles: ReadonlyArray<ArticleListItem>;
}
export type ArticleListActions = ArticleListItemActions;
type AllArticleListProps = ArticleListProps & ArticleListActions;

export const ArticleListComponent: React.StatelessComponent<AllArticleListProps> = (props: AllArticleListProps): JSX.Element => (
    <View>
        {R.map((article: ArticleListItem) =>
            <ArticleListItemComponent
                key={article.id}
                goToArticleDetail={props.goToArticleDetail}
                {...article}
            />, props.articles)}
    </View>
);
