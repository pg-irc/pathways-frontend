import React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Article } from '../../selectors/articles';
import { Id as TaskId } from '../../stores/tasks';
import { applicationStyles } from '../../application/styles';
import { ArticleListItemActions } from './article_list_item';
import { TaskListItemActions } from '../tasks/task_list_item';
import { RelatedTasksComponent } from '../related_tasks/related_tasks';
import { RelatedArticlesComponent } from '../related_articles/related_articles';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<TaskId>;
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
                            <Text>{props.article.description}</Text>
                        </Row>
                        <RelatedArticlesComponent
                            relatedArticles={props.article.relatedArticles}
                            {...props}
                        />
                        <RelatedTasksComponent
                            relatedTasks={props.article.relatedTasks}
                            savedTasks={props.savedTasks}
                            {...props}
                        />
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
