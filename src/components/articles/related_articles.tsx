import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles/article_list_item';
import { ArticleListComponent } from './article_list';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';

interface RelatedArticlesProps {
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
}
type AllRelatedArticlesProps = RelatedArticlesProps & RouterProps;

export const RelatedArticlesComponent: React.StatelessComponent<AllRelatedArticlesProps> = (props: AllRelatedArticlesProps): JSX.Element => {
    if (props.relatedArticles.length === 0) {
        return emptyComponent();
    }
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>LEARN MORE</Trans></Text>
            <ArticleListComponent
                {...props}
                articles={props.relatedArticles} />
        </View>
    );
};
