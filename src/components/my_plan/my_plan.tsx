// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import * as R from 'ramda';
import { I18nManager, StyleSheet } from 'react-native';
import { Content, Text, View, Col, Row, Grid, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors, values } from '../../application/styles';
import { CollapsibleContent } from '../collapsible_content/collapsible_content';
import { TaskListItem } from '../../selectors/tasks';
import {
    TaskListComponent,
    TaskListActions,
    noTasksAddedYetTextComponent,
    noTasksRecommendedTextComponent,
    noTasksCompletedTextComponent,
} from '../tasks/task_list';
import { RouterProps } from '../../application/routing';
import { MyPlanIntroComponent, EmptyMyPlanIntroComponent } from './my_plan_intro_component';

export interface MyPlanProps {
    readonly savedTasks: ReadonlyArray<TaskListItem>;
    readonly recommendedTasks: ReadonlyArray<TaskListItem>;
    readonly completedTasks: ReadonlyArray<TaskListItem>;
}

interface MyPlanState {
    readonly savedTasksIsCollapsed: boolean;
    readonly recommendedTasksIsCollapsed: boolean;
    readonly completedTasksIsCollapsed: boolean;
}
type Props = MyPlanProps & TaskListActions & RouterProps;

interface ContentComponentRef extends Content {
    // This should be something like: "KeyboardAwareScrollView" but couldn't get the type working
    // tslint:disable-next-line:no-any
    readonly _root: any;
}

export class MyPlanComponent extends React.Component<Props, MyPlanState> {
    contentComponent: ContentComponentRef;

    constructor(props: Props) {
        super(props);
        this.state = {
            savedTasksIsCollapsed: false,
            recommendedTasksIsCollapsed: false,
            completedTasksIsCollapsed: true,
        };
        this.getCompletedButtonOnPress = this.getCompletedButtonOnPress.bind(this);
        this.toggleSavedTasksCollapsed = this.toggleSavedTasksCollapsed.bind(this);
        this.toggleRecommendedTasksCollapsed = this.toggleRecommendedTasksCollapsed.bind(this);
        this.toggleCompletedTasksCollapsed = this.toggleCompletedTasksCollapsed.bind(this);
    }

    render(): JSX.Element {
        return (
            <Content padder ref={(component: ContentComponentRef): ContentComponentRef => this.contentComponent = component}>
                <Header
                    completedCount={this.props.completedTasks.length}
                    completedButtonOnPress={this.getCompletedButtonOnPress}
                />
                <Intro {...this.props} />
                <CollapsibleContent
                    collapsedHeader={this.getHeaderForSavedTasks(collapsedIcon())}
                    expandedHeader={this.getHeaderForSavedTasks(expandedIcon())}
                    onHeaderPress={this.toggleSavedTasksCollapsed}
                    content={this.getContentForSavedTasks()}
                    collapsed={this.state.savedTasksIsCollapsed}
                />
                <View style={applicationStyles.divider} />
                <CollapsibleContent
                    collapsedHeader={this.getHeaderForRecommendedTasks(collapsedIcon())}
                    expandedHeader={this.getHeaderForRecommendedTasks(expandedIcon())}
                    onHeaderPress={this.toggleRecommendedTasksCollapsed}
                    content={this.getContentForRecommendedTasks()}
                    collapsed={this.state.recommendedTasksIsCollapsed}
                    style={styles.greyBackground}
                />
                <View style={applicationStyles.divider} />
                <CollapsibleContent
                    collapsedHeader={this.getHeaderForCompletedTasks(collapsedIcon())}
                    expandedHeader={this.getHeaderForCompletedTasks(expandedIcon())}
                    onHeaderPress={this.toggleCompletedTasksCollapsed}
                    content={this.getContentForCompletedTasks()}
                    collapsed={this.state.completedTasksIsCollapsed}
                    style={styles.greyBackground}
                />
            </Content>
        );
    }

    private getHeaderForSavedTasks(icon: string): JSX.Element {
        return (
            <Grid>
                <Row>
                    <Col size={85} >
                        <Row style={styles.listItemLabel}>
                            <Text style={applicationStyles.bold}><Trans>MY TASKS</Trans></Text>
                            <Icon style={styles.icon} name={icon} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }

    private getHeaderForRecommendedTasks(icon: string): JSX.Element {
        return (
            <Grid>
                <Row>
                    <Col size={85} >
                        <Row style={styles.listItemLabel}>
                            <Text style={applicationStyles.bold}><Trans>RECOMMENDED FOR ME</Trans></Text>
                            <Icon style={styles.icon} name='star-circle' type='MaterialCommunityIcons' />
                            <Icon style={styles.icon} name={icon} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }

    private getHeaderForCompletedTasks(icon: string): JSX.Element {
        return (
            <Grid>
                <Row>
                    <Col size={85} >
                        <Row style={styles.listItemLabel}>
                            <Text style={applicationStyles.bold}><Trans>COMPLETED TASKS</Trans></Text>
                            <Icon style={styles.icon} name={icon} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }

    private getContentForSavedTasks(): JSX.Element {
        return (
            <TaskListComponent
                {...this.props}
                addToSavedList={undefined}
                tasks={this.props.savedTasks}
                emptyTaskListComponent={noTasksAddedYetTextComponent()} />
        );
    }

    private getContentForRecommendedTasks(): JSX.Element {
        return (
            <TaskListComponent
                {...this.props}
                tasks={this.props.recommendedTasks}
                listItemStyle={styles.greyBackground}
                emptyTaskListComponent={noTasksRecommendedTextComponent()} />
        );
    }

    private getContentForCompletedTasks(): JSX.Element {
        return (
            <TaskListComponent
                {...this.props}
                tasks={this.props.completedTasks}
                listItemStyle={styles.greyBackground}
                emptyTaskListComponent={noTasksCompletedTextComponent()} />
        );
    }

    private getCompletedButtonOnPress(): void {
        if (this.state.completedTasksIsCollapsed) {
            this.toggleCompletedTasksCollapsed();
        }
        this.contentComponent._root.scrollToEnd();
    }

    private toggleSavedTasksCollapsed(): void {
        this.setState({ ...this.state, savedTasksIsCollapsed: !this.state.savedTasksIsCollapsed });
    }

    private toggleRecommendedTasksCollapsed(): void {
        this.setState({ ...this.state, recommendedTasksIsCollapsed: !this.state.recommendedTasksIsCollapsed });
    }

    private toggleCompletedTasksCollapsed(): void {
        this.setState({ ...this.state, completedTasksIsCollapsed: !this.state.completedTasksIsCollapsed });
    }
}

interface HeaderProps {
    readonly completedCount: number;
}
interface HeaderActions {
    readonly completedButtonOnPress: () => void;
}
const Header: React.StatelessComponent<HeaderProps & HeaderActions> = (props: HeaderProps & HeaderActions): JSX.Element => {
    return (
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={[applicationStyles.pageTitle]}><Trans>My Plan</Trans></Text>
            <Button onPress={(): void => props.completedButtonOnPress()} rounded small style={[{ backgroundColor: colors.darkGrey }]}>
                <Text><Trans>COMPLETED {props.completedCount}</Trans></Text>
            </Button>
        </View>
    );
};

const Intro: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    R.isEmpty(props.recommendedTasks) ? <EmptyMyPlanIntroComponent {...props} /> : <MyPlanIntroComponent {...props} />
);

const collapsedIcon = (): string => (
    I18nManager.isRTL ? 'arrow-dropleft' : 'arrow-dropright'
);

const expandedIcon = (): string => (
    'arrow-dropdown'
);

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: values.smallIconSize,
    },
    listItemLabel: {
        alignItems: 'center',
    },
    greyBackground: {
        backgroundColor: colors.lighterGrey,
    },
});
