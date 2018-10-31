// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { View, Button, Content, Text, Icon, Tab, Tabs, TabHeading, ListItem } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { markdownStyles, textStyles, applicationStyles, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { TaskServices } from '../../selectors/services/task_services';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { ServiceComponent } from '../services/service';
import { RelatedTasksComponent } from './related_tasks_component';
import { RouterProps } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { computeStateLabel, computeStateButtons, TaskStateLabel, TaskStateButton } from './task_states';
import Markdown from 'react-native-markdown-renderer';
import { Task } from '../../selectors/tasks/task';
import { Service } from '../../stores/services';

export interface TaskDetailProps {
    readonly task: Task;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly taskServices: TaskServices;
}
export interface TaskDetailActions {
    readonly toggleCompleted: (taskId: TaskId) => ToggleCompletedAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: TaskId) => RemoveFromSavedListAction;
    readonly requestUpdateOfServicesForTask: (task: Task) => UpdateTaskServicesAsync.Request;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}

type Props = TaskDetailProps & TaskDetailActions & TaskServiceUpdater & RouterProps;

type TabChangeEvent = { readonly i: number, from: number, readonly ref: React.Ref<Tabs> };

export class TaskDetailComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    render(): JSX.Element {
        return (
            <View style={[applicationStyles.body, { flex: 1 }]}>
                <TitleComponent {...this.props} />
                <Tabs style={{ marginHorizontal: -10 }} onChangeTab={this.props.requestUpdateTaskServices}>
                    <Tab heading={<TabHeading><Text><Trans>INFORMATION</Trans></Text></TabHeading>}>
                        <InformationTab {...this.props} />
                    </Tab>
                    <Tab heading={<TabHeading><Text><Trans>FIND SERVICES</Trans></Text></TabHeading>}>
                        <ServicesTab {...this.props} />
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

const TitleComponent = (props: Props): JSX.Element => {
    const task = props.task;
    const state = {
        isRecommended: task.isRecommended,
        isSaved: R.any((id: TaskId) => id === task.id, props.savedTasksIdList),
        isCompleted: task.completed,
    };
    const stateLabel = toJsxLabel(computeStateLabel(state));
    const stateButtons = toJsxButtons(computeStateButtons(state), props);
    return (
        <View style={{ flex: 0, flexGrow: 0, flexShrink: 0, height: 'auto' }}>
            <View>
                <Text style={textStyles.headlineH1StyleBlackLeft}>{task.title}</Text>
                <Text style={[
                    textStyles.paragraphBoldBlackLeft,
                    { marginBottom: 5 },
                ]}>
                    {stateLabel}
                </Text>
                <View>
                    {stateButtons}
                </View>
            </View>
        </View>
    );
};

const toJsxLabel = (label: TaskStateLabel): JSX.Element => {
    switch (label) {
        default: return <Trans>TASK</Trans>;
        case TaskStateLabel.CompletedTask: return <Trans>COMPLETED TASK</Trans>;
        case TaskStateLabel.TaskIPlanToDo: return <Trans>TASK I PLAN TO DO</Trans>;
        case TaskStateLabel.RecommendedTask: return <Trans>RECOMMENDED TASK</Trans>;
    }
};

const toJsxButtons = (buttons: ReadonlyArray<TaskStateButton>, props: Props): JSX.Element => {
    const mapWithIndex = R.addIndex(R.map);
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                mapWithIndex((button: TaskStateButton, index: number) => {
                    switch (button) {
                        default:
                        case TaskStateButton.AddToPlanButton: return <AddToPlanButton key={index} {...props} />;
                        case TaskStateButton.DoneButton: return <DoneButton key={index} {...props} />;
                        case TaskStateButton.NotDoneButton: return <NotDoneButton key={index} {...props} />;
                        case TaskStateButton.RemoveFromPlanButton: return <RemoveFromPlanButton key={index} {...props} />;
                    }
                }, buttons)
            }
        </View>
    );
};

const AddToPlanButton = (props: Props): JSX.Element => (
    <Button
        iconLeft
        onPress={(): AddToSavedListAction => props.addToSavedList(props.task.id)}
        style={[applicationStyles.orangeButton, { flex: 1 }]}
    >
        <Icon name={'plus'} type='MaterialCommunityIcons' />
        <Text style={textStyles.paragraphStyleWhiteleft}><Trans>Add to plan</Trans></Text>
    </Button>
);

const RemoveFromPlanButton = (props: Props): JSX.Element => (
    <Button
        iconLeft
        onPress={(): RemoveFromSavedListAction => props.removeFromSavedList(props.task.id)}
        style={applicationStyles.orangeButton}
    >
        <Icon name={'minus'} type='MaterialCommunityIcons' />
        <Text style={textStyles.paragraphStyleWhiteleft}><Trans>Remove from plan</Trans></Text>
    </Button>
);

const NotDoneButton = (props: Props): JSX.Element => (
    <Button
        iconLeft
        onPress={(): void => { props.toggleCompleted(props.task.id); props.addToSavedList(props.task.id); }}
        style={applicationStyles.orangeButton}
    >
        <Icon name={'checkbox-marked-outline'} type='MaterialCommunityIcons' />
        <Text style={textStyles.paragraphStyleWhiteleft}><Trans>Mark as not done</Trans></Text>
    </Button>
);

const DoneButton = (props: Props): JSX.Element => (
    <Button
        iconLeft
        onPress={(): void => { props.toggleCompleted(props.task.id); props.removeFromSavedList(props.task.id); }}
        style={applicationStyles.orangeButton}
    >
        <Icon name={'checkbox-blank-outline'} type='MaterialCommunityIcons' />
        <Text style={textStyles.paragraphStyleWhiteleft}><Trans>Mark done</Trans></Text>
    </Button>
);

const InformationTab = (props: Props): JSX.Element => (
    <Content padder>
        <Grid style={{ padding: values.contentPadding }}>
            {props.task.isRecommended ? <ThisTaskIsRecommended /> : <EmptyComponent />}
            <TaxonomyComponent {...props} />
            <Row style={styles.row}>
                <Markdown style={markdownStyles}>{props.task.description}</Markdown>
            </Row>
            <RelatedTasksComponent
                {...props}
                relatedTasks={props.task.relatedTasks}
            />
        </Grid>
    </Content>
);

const ThisTaskIsRecommended = (): JSX.Element => (
    <Row style={styles.row}>
        <Col size={10}>
            <Icon type='MaterialCommunityIcons' name='star-circle' />
        </Col>
        <Col size={90} style={styles.iconText}>
            <Text style={textStyles.paragraphStyle}>
                This task is <Text style={textStyles.paragraphBoldBlackLeft}>recommended for you</Text>.
            </Text>
        </Col>
    </Row>
);

const TaxonomyComponent = ({ task }: Props): JSX.Element => (
    <Row style={styles.row}>
        <Col size={10}>
            <Icon type='MaterialCommunityIcons' name={task.exploreSection.icon} />
        </Col>
        <Col size={90} style={styles.iconText}>
            <Text style={textStyles.paragraphStyle}>
                This task helps with <Text style={textStyles.paragraphBoldBlackLeft}>{task.exploreSection.name}</Text>.
            </Text>
        </Col>
    </Row>
);

const ServicesTab = (props: Props): JSX.Element => (
    <FlatList
        ListEmptyComponent={ServiceListEmpty}
        refreshing={props.taskServices.loading}
        onRefresh={props.requestUpdateTaskServices}
        data={props.taskServices.services}
        keyExtractor={(service: Service): string => service.id}
        renderItem={renderServiceListItem} />
);

function ServiceListEmpty(): JSX.Element {
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'left' }}><Trans>No related services found.</Trans></Text>
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

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

const styles = StyleSheet.create({
    iconText: {
        justifyContent: 'center',
    },
    row: {
        height: 'auto',
        marginBottom: 10,
    },
});
