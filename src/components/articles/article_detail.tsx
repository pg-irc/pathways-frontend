import React from 'react';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Article } from '../../selectors/articles';
import { Id as TaskId } from '../../stores/tasks';
import { applicationStyles } from '../../application/styles';
import { ArticleListItemActions } from './article_list_item';
import { TaskListItemActions } from '../tasks/task_list_item';
import { RelatedTasksComponent } from '../tasks/related_tasks';
import { RelatedArticlesComponent } from './related_articles';
import { RouterProps } from '../../application/routing';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<TaskId>;
}
export type ArticleDetailActions = ArticleListItemActions & TaskListItemActions;
type AllArticleDetailProps = ArticleDetailActions & ArticleDetailProps & RouterProps;

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
                            {...props}
                            relatedArticles={props.article.relatedArticles}
                        />
                        <RelatedTasksComponent
                            {...props}
                            relatedTasks={props.article.relatedTasks}
                            savedTasks={props.savedTasks}
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
