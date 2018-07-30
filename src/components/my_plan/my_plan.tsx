// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { I18nManager } from 'react-native';
import { Content, Text, View, Col, Row, Grid, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors } from '../../application/styles';
import { myPlanStyles } from './styles';
import { Collapser } from '../collapser/collapser';
import { TaskListItem } from '../../selectors/tasks';
import { TaskListComponent, TaskListActions, noTasksAddedYetTextComponent, noTasksRecommendedTextComponent } from '../tasks/task_list';
import { RouterProps } from '../../application/routing';
import { MyPlanIntroComponent, EmptyMyPlanIntroComponent } from './my_plan_intro_component';
import * as R from 'ramda';

export interface MyPlanProps {
    readonly savedTasks: ReadonlyArray<TaskListItem>;
    readonly recommendedTasks: ReadonlyArray<TaskListItem>;
}

type Props = MyPlanProps & TaskListActions & RouterProps;

export const MyPlanComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const savedTasksContent = <TaskListComponent
        {...props}
        tasks={props.savedTasks}
        emptyTaskListComponent={noTasksAddedYetTextComponent()}
    />;
    const recommendedTasksContent = <TaskListComponent
        {...props}
        tasks={props.recommendedTasks}
        listItemStyle={[{ backgroundColor: colors.lighterGrey }]}
        emptyTaskListComponent={noTasksRecommendedTextComponent()}
    />;

    return (
        <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>My Plan</Trans></Text>
            <Intro {...props} />
            <Collapser
                collapsedHeader={getHeaderForSavedTasks(collapsedIcon())}
                expandedHeader={getHeaderForSavedTasks(expandedIcon())}
                content={savedTasksContent}
                initiallyCollapsed={false}
            />
            <View style={myPlanStyles.divider} />
            <Collapser
                collapsedHeader={getHeaderForSuggestedTasks(collapsedIcon())}
                expandedHeader={getHeaderForSuggestedTasks(expandedIcon())}
                content={recommendedTasksContent}
                initiallyCollapsed={false}
                style={myPlanStyles.suggestedTasks}
            />
        </Content>
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
                <Row style={myPlanStyles.listItemLabel}>
                    <Text style={applicationStyles.bold}><Trans>MY TASKS</Trans></Text>
                    <Icon style={myPlanStyles.icon} name={icon} />
                </Row>
            </Col>
        </Row>
    </Grid>
);

const getHeaderForSuggestedTasks = (icon: string): JSX.Element => (
    <Grid>
        <Row>
            <Col size={85} >
                <Row style={myPlanStyles.listItemLabel}>
                    <Text style={applicationStyles.bold}><Trans>RECOMMENDED FOR ME</Trans></Text>
                    <Icon style={myPlanStyles.icon} name='star-circle' type='MaterialCommunityIcons' />
                    <Icon style={myPlanStyles.icon} name={icon} />
                </Row>
            </Col>
        </Row>
    </Grid>
);
