import React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Article } from '../../selectors/articles';
import { applicationStyles } from '../../application/styles';
import { ArticleListComponent } from './article_list';
import { ArticleListItemActions } from './article_list_item';
import { Trans } from '@lingui/react';

export interface ArticleDetailProps {
    readonly article: Article;
}

export type ArticleDetailActions = ArticleListItemActions;

export type AllArticleDetailProps = ArticleDetailActions & ArticleDetailProps;

export const ArticleDetailComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => {
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Text>[image]</Text>
                        </Row>
                        {getActions(props)}
                        <Row>
                            <Text>{props.article.content}</Text>
                        </Row>
                        {props.article.relatedArticles ? getRelatedArticles(props) : undefined}
                    </Grid>
                </Content>
            </Container>
    );
};

const getActions = (props: AllArticleDetailProps): JSX.Element => (
    <Row>
        <Col size={70}>
            <Text style={applicationStyles.pageTitle}>{props.article.name}</Text>
        </Col>
        <Col size={15}>
            <Button dark transparent>
                <Icon type='MaterialCommunityIcons' name='heart-outline' />
            </Button>
        </Col>
        <Col size={15}>
            <Button dark transparent>
                <Icon name='share' />
            </Button>
        </Col>
    </Row>
);

const getRelatedArticles = (props: AllArticleDetailProps): JSX.Element => (
    <Col>
        <Row style={applicationStyles.hr} />
        <Row>
            <Text style={applicationStyles.bold}><Trans>LEARN MORE</Trans></Text>
        </Row>
        <ArticleListComponent
            articles={props.article.relatedArticles}
            goToArticleDetail={props.goToArticleDetail}
        />
    </Col>
);
