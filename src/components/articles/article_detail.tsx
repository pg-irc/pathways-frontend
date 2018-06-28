import React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Article } from '../../selectors/articles';
import { Task } from '../../selectors/tasks';
import { applicationStyles } from '../../application/styles';
import { ArticleListComponent } from './article_list';
import { ArticleListItemActions } from './article_list_item';
import { TaskListItemActions } from '../tasks/task_list_item';
import { TaskListComponent } from '../tasks/task_list';
import R from 'ramda';
import { RelatedContentList } from '../related_content_list/related_content_list';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<Task>;
}
export type ArticleDetailActions = ArticleListItemActions & TaskListItemActions;
type AllArticleDetailProps = ArticleDetailActions & ArticleDetailProps;

export const ArticleDetailComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Text>[image]</Text>
                        </Row>
                        {renderActions(props)}
                        <Row>
                            <Text>{article.description}</Text>
                        </Row>
                        {props.article.relatedArticles ? renderRelatedArticles(props) : undefined}
                        {props.article.relatedTasks ? renderRelatedTasks(props) : undefined}
                    </Grid>
                </Content>
            </Container>
    );

const renderActions = (props: AllArticleDetailProps): JSX.Element => (
    <Row>
        <Col size={70}>
            <Text style={applicationStyles.pageTitle}>{props.article.title}</Text>
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

const renderRelatedArticles = (props: AllArticleDetailProps): JSX.Element => {
    const componentProps = {
        articles: props.article.relatedArticles,
        goToArticleDetail: props.goToArticleDetail,
    };
    return (
        <RelatedContentList
            title={'LEARN MORE'}
            component={ArticleListComponent}
            componentProps={componentProps}
        />
    );
};

const renderRelatedTasks = (props: AllArticleDetailProps): JSX.Element => {
    const shouldDisplayTaskInteractions = (task: Task): boolean => (
        R.find(R.propEq('id', task.id), props.savedTasks) === undefined
    );
    const componentProps = {
        tasks: props.article.relatedTasks,
        goToTaskDetail: props.goToTaskDetail,
        addToSavedList: props.addToSavedList,
        shouldDisplayTaskInteractions: shouldDisplayTaskInteractions,
    };
    return (
        <RelatedContentList
            title={'RELATED TASKS'}
            component={TaskListComponent}
            componentProps={componentProps}
        />
    );
};
