// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import * as R from 'ramda';
import { I18nManager, StyleSheet } from 'react-native';
import { Content, Text, View, Col, Row, Grid, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors, values } from '../../application/styles';
import { Collapser } from '../collapser/collapser';
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

type Props = MyPlanProps & TaskListActions & RouterProps;
interface ContentComponentRef extends Content {
    // This should be a "KeyboardAwareScrollView"
    // tslint:disable-next-line:no-any
    readonly _root: any;
}

export class MyPlanComponent extends React.Component<Props> {
    savedTasksContent: JSX.Element = <TaskListComponent
        {...this.props}
        tasks={this.props.savedTasks}
        emptyTaskListComponent={noTasksAddedYetTextComponent()}
    />;
    recommendedTasksContent: JSX.Element = <TaskListComponent
        {...this.props}
        tasks={this.props.recommendedTasks}
        listItemStyle={[{ backgroundColor: colors.lighterGrey }]}
        emptyTaskListComponent={noTasksRecommendedTextComponent()}
    />;
    completedTasksContent: JSX.Element = <TaskListComponent
        {...this.props}
        tasks={this.props.completedTasks}
        listItemStyle={[{ backgroundColor: colors.lighterGrey }]}
        emptyTaskListComponent={noTasksCompletedTextComponent()}
    />;
    contentComponent: ContentComponentRef;

    render(): JSX.Element {
        return (
            <Content padder ref={(component: ContentComponentRef): ContentComponentRef => this.contentComponent = component}>
                <Header
                    completedCount={this.props.completedTasks.length}
                    completedButtonOnPress={(): void => this.contentComponent._root.scrollToEnd()}
                />
                <Intro {...this.props} />
                <Collapser
                    collapsedHeader={getHeaderForSavedTasks(collapsedIcon())}
                    expandedHeader={getHeaderForSavedTasks(expandedIcon())}
                    content={this.savedTasksContent}
                    initiallyCollapsed={false}
                />
                <View style={applicationStyles.divider} />
                <Collapser
                    collapsedHeader={getHeaderForSuggestedTasks(collapsedIcon())}
                    expandedHeader={getHeaderForSuggestedTasks(expandedIcon())}
                    content={this.recommendedTasksContent}
                    initiallyCollapsed={false}
                    style={[{ backgroundColor: colors.lighterGrey }]}
                />
                <View style={applicationStyles.divider} />
                <Collapser
                    collapsedHeader={getHeaderForCompletedTasks(collapsedIcon())}
                    expandedHeader={getHeaderForCompletedTasks(expandedIcon())}
                    content={this.completedTasksContent}
                    initiallyCollapsed={true}
                    style={[{ backgroundColor: colors.lighterGrey }]}
                />
            </Content>
        );
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
        <View style={[ { flex: 1, flexDirection: 'row', justifyContent: 'space-between'} ]}>
            <Text style={[ applicationStyles.pageTitle ]}><Trans>My Plan</Trans></Text>
            <Button onPress={props.completedButtonOnPress} rounded small style={[ { backgroundColor: colors.darkGrey } ]}>
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

const getHeaderForSavedTasks = (icon: string): JSX.Element => (
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

const getHeaderForSuggestedTasks = (icon: string): JSX.Element => (
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

const getHeaderForCompletedTasks = (icon: string): JSX.Element => (
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

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: values.smallIconSize,
    },
    listItemLabel: {
        alignItems: 'center',
    },
});
