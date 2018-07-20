// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { I18nManager } from 'react-native';
import { Content, Text, View, Col, Row, Grid, Button, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors } from '../../application/styles';
import { myPlanStyles } from './styles';
import { Collapser } from '../collapser/collapser';
import { TaskListItem } from '../../selectors/tasks';
import { TaskListComponent, TaskListActions } from '../tasks/task_list';
import { RouterProps } from '../../application/routing';

export interface MyPlanProps {
    readonly savedTasks: ReadonlyArray<TaskListItem>;
    readonly recommendedTasks: ReadonlyArray<TaskListItem>;
}

type AllMyPlanProps = MyPlanProps & TaskListActions & RouterProps;

export const MyPlanComponent: React.StatelessComponent<AllMyPlanProps> = (props: AllMyPlanProps): JSX.Element => {
    const savedTasksContent = <TaskListComponent {...props} tasks={props.savedTasks} />;
    const recommendedTasksContent =
        <TaskListComponent
            {...props}
            tasks={props.recommendedTasks}
            listItemStyle={[{ backgroundColor: colors.lighterGrey }]} />;

    return (
        <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>My Plan</Trans></Text>
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
                initiallyCollapsed={true}
                style={myPlanStyles.suggestedTasks}
            />
        </Content>
    );
};

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
                    <Text style={applicationStyles.bold}><Trans>TASKS I PLAN TO DO</Trans></Text>
                    <Icon style={myPlanStyles.icon} name={icon} />
                </Row>
            </Col>
            <Col size={15}>
                <Button dark transparent><Icon name='more' /></Button>
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
            <Col size={15}>
                <Button dark transparent><Icon name='more' /></Button>
            </Col>
        </Row>
        <Row>
            <Col size={85}>
                <Row>
                    <Text style={myPlanStyles.recommendedText}><Trans>Important for all newcomers to BC:</Trans></Text>
                </Row>
            </Col>
            <Col size={15}>
                <Icon style={myPlanStyles.infoIcon} name='information-outline' type='MaterialCommunityIcons' />
            </Col>
        </Row>
    </Grid>
);
