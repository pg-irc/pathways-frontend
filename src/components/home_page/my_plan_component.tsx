import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { View, Button, Text } from 'native-base';
import { applicationStyles, colors } from '../../application/styles';
import { TaskListComponent } from '../tasks/task_list';
import { HomePageProps } from './props';
import { RouterProps, Routes, goToRouteWithoutParameter } from '../../application/routing';
import { TaskListItemActions } from '../tasks/task_list_item';
import { MyPlanIntroComponent, EmptyMyPlanIntroComponent } from '../my_plan/my_plan_intro_component';

type AllHomePageProps = HomePageProps & TaskListItemActions & RouterProps;

export const MyPlanComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => (
    <View>
        <Text style={[applicationStyles.bold, { marginBottom: 10 }]}><Trans>MY PLAN</Trans></Text>
        {R.isEmpty(props.tasks) ? introWithoutTasks(props) : introWithTasks(props)}
        <TaskListComponent
            {...props}
            tasks={R.take(3, props.tasks)}
            listItemStyle={{ backgroundColor: colors.lighterGrey }}
            // tslint:disable-next-line:no-null-keyword
            emptyTaskListComponent={null} />

        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }]}>
            <Button
                style={[{ backgroundColor: colors.darkGrey }]}
                onPress={goToRouteWithoutParameter(Routes.MyPlan, props.history)}>
                <Text><Trans>GO TO MY PLAN</Trans></Text>
            </Button>
        </View>
        <View style={applicationStyles.hr} />
    </View>
);

const introWithTasks = (props: RouterProps): JSX.Element => (
    <View>
        <MyPlanIntroComponent {...props} />
        <Text style={[
            { textAlign: 'left' },
            { marginBottom: 20 },
        ]}>
            <Trans>Here are some recommended tasks:</Trans>
        </Text>
    </View >
);

const introWithoutTasks = (props: RouterProps): JSX.Element => (
    <EmptyMyPlanIntroComponent {...props} />
);
