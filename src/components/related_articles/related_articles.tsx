import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles';
import { ArticleListComponent } from '../articles/article_list';
import { Trans } from '@lingui/react';
import { ArticleListItemActions } from '../articles/article_list_item';

interface RelatedArticlesProps {
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
}
type AllRelatedArticlesProps = RelatedArticlesProps & ArticleListItemActions;

export const RelatedArticlesComponent: React.StatelessComponent<AllRelatedArticlesProps> = (props: AllRelatedArticlesProps): JSX.Element => {
    if (props.relatedArticles.length === 0) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    const componentProps = {
        articles: props.relatedArticles,
        goToArticleDetail: props.goToArticleDetail,
    };
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>LEARN MORE</Trans></Text>
            <ArticleListComponent {...componentProps} />
        </View>
    );
};
