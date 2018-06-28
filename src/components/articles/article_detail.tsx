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
import { Trans } from '@lingui/react';
import R from 'ramda';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<Task>;
}
export type ArticleDetailActions = ArticleListItemActions & TaskListItemActions;
type AllArticleDetailProps = ArticleDetailActions & ArticleDetailProps;

export const ArticleDetailComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => {
        const article = props.article;
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Text>[image]</Text>
                        </Row>
                        {renderActions(props)}
                        <Row>
                            <Text>{article.content}</Text>
                        </Row>
                        {article.relatedArticles ? renderRelatedContent('LEARN MORE', renderRelatedArticles(props)) : undefined}
                        {article.relatedTasks ? renderRelatedContent('RELATED TASKS', renderRelatedTasks(props)) : undefined}
                    </Grid>
                </Content>
            </Container>
    );
};

const renderActions = (props: AllArticleDetailProps): JSX.Element => (
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

const renderRelatedArticles = (props: AllArticleDetailProps): JSX.Element => {
    return(
        <ArticleListComponent
            articles={props.article.relatedArticles}
            goToArticleDetail={props.goToArticleDetail}
        />
    );
};

const renderRelatedTasks = (props: AllArticleDetailProps): JSX.Element => {
    const shouldDisplayTaskInteractions = (task: Task): boolean => (
        R.find(R.propEq('id', task.id), props.savedTasks) === undefined
    );
    return (
        <TaskListComponent
            tasks={props.article.relatedTasks}
            goToTaskDetail={props.goToTaskDetail}
            addToSavedList={props.addToSavedList}
            shouldDisplayTaskInteractions={shouldDisplayTaskInteractions}
        />
    );
};

const renderRelatedContent = (sectionTitle: string, renderedContent: JSX.Element): JSX.Element => (
    <Col>
        <Row style={applicationStyles.hr} />
        <Row>
            <Text style={applicationStyles.bold}><Trans>{sectionTitle}</Trans></Text>
        </Row>
        {renderedContent}
    </Col>
);
