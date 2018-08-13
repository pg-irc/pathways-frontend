import React from 'react';
import R from 'ramda';
import { View } from 'native-base';
import { ArticleListItem } from '../../selectors/articles/article_list_item';
import { ArticleListItemComponent } from './article_list_item';
import { RouterProps } from '../../application/routing';

export interface ArticleListProps {
    readonly articles: ReadonlyArray<ArticleListItem>;
}
type AllArticleListProps = ArticleListProps & RouterProps;

export const ArticleListComponent: React.StatelessComponent<AllArticleListProps> = (props: AllArticleListProps): JSX.Element => (
    <View>
        {R.map((article: ArticleListItem) =>
            <ArticleListItemComponent
                {...props}
                key={article.id}
                article={article}
            />, props.articles)}
    </View>
);
