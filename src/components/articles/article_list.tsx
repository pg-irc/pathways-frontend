import React from 'react';
import R from 'ramda';
import { View } from 'native-base';
import { ArticleListItem } from '../../selectors/articles';
import { ArticleListItemComponent, ArticleListItemActions } from './article_list_item';
import { RouterProps } from '../../application/routing';

export interface ArticleListProps {
    readonly articles: ReadonlyArray<ArticleListItem>;
}
export type ArticleListActions = ArticleListItemActions;
type AllArticleListProps = ArticleListProps & ArticleListActions & RouterProps;

export const ArticleListComponent: React.StatelessComponent<AllArticleListProps> = (props: AllArticleListProps): JSX.Element => (
    <View>
        {R.map((article: ArticleListItem) =>
            <ArticleListItemComponent
                {...props}
                {...article}
                key={article.id}
                goToArticleDetail={props.goToArticleDetail}
            />, props.articles)}
    </View>
);
