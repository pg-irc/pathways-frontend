// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View, Button, Content, Text, Icon, Tab, Tabs, TabHeading, ListItem } from 'native-base';
import { Id as TaskId } from '../../stores/tasks';
import { Task } from '../../selectors/tasks';
import { TaskListItemActions } from '../tasks/task_list_item';
import { ArticleListItemActions } from '../articles/article_list_item';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { taskDetailStyles } from './styles';
import { Trans } from '@lingui/react';
import { Service, TaskServices} from '../../selectors/services';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { ServiceComponent } from '../services/service';
import { RelatedTasksComponent } from '../related_tasks/related_tasks';
import { RelatedArticlesComponent } from '../related_articles/related_articles';

export interface TaskDetailProps {
    readonly task: Task;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly taskServices: TaskServices;
}
export interface TaskDetailActions extends TaskListItemActions, ArticleListItemActions {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}
type AllTaskDetailProps = TaskDetailProps & TaskDetailActions;
type TabChangeEvent = { readonly i: number, from: number, readonly ref: React.Ref<Tabs> };

export class TaskDetailComponent extends React.Component<AllTaskDetailProps> {

    constructor(props: AllTaskDetailProps) {
        super(props);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <Content padder scrollEnabled={false} style={{ flex: 0, flexGrow: 0, flexShrink: 0, height: 'auto' }}>
                    <Grid>
                        <Row>
                            <Text style={applicationStyles.bold}><Trans>COMPLETED TASK</Trans></Text>
                        </Row>
                        <Row>
                            <Text style={taskDetailStyles.title}>{this.props.task.title}</Text>
                        </Row>
                        <Row style={taskDetailStyles.actions}>
                            <Col size={70}>
                                <Button iconLeft rounded light>
                                    <Icon name='checkbox' />
                                    <Text><Trans>Done</Trans></Text>
                                </Button>
                            </Col>
                            <Col size={15}>
                                <Button dark transparent>
                                    <Icon name='share' />
                                </Button>
                            </Col>
                            <Col size={15}>
                                <Button dark transparent>
                                    <Icon name='more' />
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <Tabs style={taskDetailStyles.tabs} onChangeTab={this.props.requestUpdateTaskServices}>
                    <Tab heading={<TabHeading><Text><Trans>INFORMATION</Trans></Text></TabHeading>}>
                        <Content padder>
                            <Grid style={taskDetailStyles.tabContent}>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='star-circle' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
                                        <Text>This task is <Text style={applicationStyles.bold}>recommended for you</Text>.</Text>
                                    </Col>
                                </Row>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='sign-text' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
                                        <Text>This task helps with <Text style={applicationStyles.bold}>settling in</Text>.</Text>
                                    </Col>
                                </Row>
                                <Row style={taskDetailStyles.row}>
                                    <Text>You can get information about your community ...</Text>
                                </Row>
                                <RelatedArticlesComponent
                                    relatedArticles={this.props.task.relatedArticles}
                                    {...this.props}
                                />
                                <RelatedTasksComponent
                                    relatedTasks={this.props.task.relatedTasks}
                                    savedTasks={this.props.savedTasks}
                                    {...this.props}
                                />
                            </Grid>
                        </Content>
                    </Tab>
                    <Tab heading={<TabHeading><Text><Trans>FIND SERVICES</Trans></Text></TabHeading>}>
                        <FlatList
                            ListEmptyComponent={ServiceListEmpty}
                            refreshing={this.props.taskServices.loading}
                            onRefresh={this.props.requestUpdateTaskServices}
                            data={this.props.taskServices.services}
                            keyExtractor={(service: Service): string => service.id}
                            renderItem={renderServiceListItem} />
                    </Tab>
                </Tabs>
            </View>
        );
    }

    private onChangeTab({ i, from }: TabChangeEvent): void {
        if (from === 0 && i === 1) {
            this.props.requestUpdateTaskServices();
        }
    }

}

interface ServiceItemInfo extends ListRenderItemInfo<Service> {}

function ServiceListEmpty(): JSX.Element {
    return (
        <View style={{ padding: 20 }}>
            <Text><Trans>No related services found.</Trans></Text>
        </View>
    );
}

function renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
    return (
        <ListItem>
            <ServiceComponent service={item} />
        </ListItem>
    );
}
