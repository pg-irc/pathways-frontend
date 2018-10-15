// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View, Button, Content, Text, Icon, Tab, Tabs, TabHeading, ListItem } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles, markdownStyles } from '../../application/styles';
import { taskDetailStyles } from './styles';
import { Trans } from '@lingui/react';
import { TaskServices } from '../../selectors/services/task_services';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { ServiceComponent } from '../services/service';
import { RelatedTasksComponent } from './related_tasks';
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
            <View style={{ flex: 1 }}>
                <TitleComponent {...this.props} />
                <Tabs style={taskDetailStyles.tabs} onChangeTab={this.props.requestUpdateTaskServices}>
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

const TitleComponent = (props: Props): JSX.Element => (
    <Content padder scrollEnabled={false} style={{ flex: 0, flexGrow: 0, flexShrink: 0, height: 'auto' }}>
        {renderHeader(props)}
    </Content>
);

function renderHeader(props: Props): JSX.Element {
    const task = props.task;

    const doneButton = (
        <Button iconLeft rounded light
            onPress={(): void => { props.toggleCompleted(task.id); props.removeFromSavedList(task.id); }}>
            <Icon name='checkbox-blank-outline' type='MaterialCommunityIcons' />
            <Text style={[{ textAlign: 'left' }]}><Trans>Mark Done</Trans></Text>
        </Button>
    );
    const notDoneButton = (
        <Button iconLeft rounded light
            onPress={(): void => { props.toggleCompleted(task.id); props.addToSavedList(task.id); }}>
            <Icon name='checkbox-marked-outline' type='MaterialCommunityIcons' />
            <Text style={[{ textAlign: 'left' }]}><Trans>Mark as not Done</Trans></Text>
        </Button>
    );
    const removeFromPlanButton = (
        <Button iconLeft rounded light onPress={(): RemoveFromSavedListAction => props.removeFromSavedList(task.id)}>
            <Icon name='minus' type='MaterialCommunityIcons' />
            <Text style={[{ textAlign: 'left' }]}><Trans>Remove from plan</Trans></Text>
        </Button>
    );
    const addToPlanButton = (
        <Button iconLeft rounded light onPress={(): AddToSavedListAction => props.addToSavedList(task.id)}>
            <Icon name='plus' type='MaterialCommunityIcons' />
            <Text style={[{ textAlign: 'left' }]}><Trans>Add to plan</Trans></Text>
        </Button>
    );

    const state = {
        isRecommended: task.isRecommended,
        isSaved: R.any((id: TaskId) => id === task.id, props.savedTasksIdList),
        isCompleted: task.completed,
    };

    const stateLabel = toJsxLabel(computeStateLabel(state));

    const buttons = {
        doneButton,
        notDoneButton,
        removeFromPlanButton,
        addToPlanButton,
    };

    const stateButtons = toJsxButtons(computeStateButtons(state), buttons);

    return buildHeader(task.title, stateLabel, stateButtons);
}

const toJsxLabel = (label: TaskStateLabel): JSX.Element => {
    switch (label) {
        default: return <Trans>TASK</Trans>;
        case TaskStateLabel.CompletedTask: return <Trans>COMPLETED TASK</Trans>;
        case TaskStateLabel.TaskIPlanToDo: return <Trans>TASK I PLAN TO DO</Trans>;
        case TaskStateLabel.RecommendedTask: return <Trans>RECOMMENDED TASK</Trans>;
    }
};

interface JsxButtons {
    readonly notDoneButton: JSX.Element;
    readonly removeFromPlanButton: JSX.Element;
    readonly doneButton: JSX.Element;
    readonly addToPlanButton: JSX.Element;
}

const toJsxButtons = (buttons: ReadonlyArray<TaskStateButton>, jsxButtons: JsxButtons): ReadonlyArray<JSX.Element> => {
    const toJsxButton = (button: TaskStateButton): JSX.Element => {
        const buttonWithKey = (button: TaskStateButton, buttonJSX: JSX.Element): JSX.Element => (
            <View key={button}>{buttonJSX}</View>
        );
        switch (button) {
            default:
            case TaskStateButton.AddToPlanButton: return buttonWithKey(button, jsxButtons.addToPlanButton);
            case TaskStateButton.DoneButton: return buttonWithKey(button, jsxButtons.doneButton);
            case TaskStateButton.NotDoneButton: return buttonWithKey(button, jsxButtons.notDoneButton);
            case TaskStateButton.RemoveFromPlanButton: return buttonWithKey(button, jsxButtons.removeFromPlanButton);
        }
    };
    return R.map(toJsxButton, buttons);
};

function buildHeader(taskTitle: string, stateTitle: JSX.Element, stateButtons: ReadonlyArray<JSX.Element>): JSX.Element {
    return (
        <View style={[
            { flexDirection: 'column' },
        ]}>
            <Text style={applicationStyles.pageTitle}>{taskTitle}</Text>
            <Text style={[
                applicationStyles.bold,
                { marginBottom: 5 },
                { textAlign: 'left' },
            ]}>
                {stateTitle}
            </Text>
            <View style={[{ flexDirection: 'row' }]}>{stateButtons}</View>
        </View>
    );
}

const InformationTab = (props: Props): JSX.Element => (
    <Content padder>
        <Grid style={taskDetailStyles.tabContent}>
            {props.task.isRecommended ? <ThisTaskIsRecommended /> : <EmptyComponent />}
            <TaxonomyComponent {...props} />
            <Row style={taskDetailStyles.row}>
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
    <Row style={taskDetailStyles.row}>
        <Col size={10}>
            <Icon type='MaterialCommunityIcons' name='star-circle' />
        </Col>
        <Col size={90} style={taskDetailStyles.iconText}>
            <Text style={[{ textAlign: 'left' }]}>This task is <Text style={applicationStyles.bold}>recommended for you</Text>.</Text>
        </Col>
    </Row>
);

const TaxonomyComponent = ({ task }: Props): JSX.Element => (
    <Row style={taskDetailStyles.row}>
        <Col size={10}>
            <Icon type='MaterialCommunityIcons' name={task.exploreSection.icon} />
        </Col>
        <Col size={90} style={taskDetailStyles.iconText}>
            <Text style={[{ textAlign: 'left' }]}>This task helps with <Text style={applicationStyles.bold}>{task.exploreSection.name}</Text>.</Text>
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
            <Text style={[{ textAlign: 'left' }]}><Trans>No related services found.</Trans></Text>
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
