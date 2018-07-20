import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { View, Button, Text } from 'native-base';
import { applicationStyles, colors } from '../../application/styles';
import { TaskListComponent } from '../tasks/task_list';
import { HomePageProps } from './props';
import { RouterProps, Routes, routePath } from '../../application/routing';
import { TaskListItemActions } from '../tasks/task_list_item';

type AllHomePageProps = HomePageProps & TaskListItemActions & RouterProps;

export const MyPlanComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => (
    <View>
        <Text style={[applicationStyles.bold, { marginBottom: 10 }]}><Trans>MY PLAN</Trans></Text>
        {R.isEmpty(props.tasks) ? myPlanIntroWithEmptyPlan(props) : myPlanIntro(props)}
        <TaskListComponent
            {...props}
            tasks={R.take(3, props.tasks)}
            listItemStyle={{ backgroundColor: colors.lighterGrey }} />

        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }]}>
            <Button
                style={[{ backgroundColor: colors.darkGrey }]}
                onPress={(): void => props.history.push(routePath(Routes.MyPlan))}>
                <Text><Trans>GO TO MY PLAN</Trans></Text>
            </Button>
        </View>
        <View style={applicationStyles.hr} />
    </View>
);

const myPlanIntro = (props: RouterProps): JSX.Element => (
    <View>
        <Text style={[
            { textAlign: 'left' },
            { marginBottom: 20 },
        ]}>
            <Trans>Plan everything you need to do as a newcomer to Canada. Want to know what next steps you need to take?
            <Text onPress={(): void => props.history.push(routePath(Routes.Questionnaire))} style={[{ color: 'blue' }]}>
            <Trans>Answer some questions</Trans></Text> to get tasks and tips recommended for you.</Trans>
        </Text>

        <Text style={[
            { textAlign: 'left' },
            { marginBottom: 20 },
        ]}>
            <Trans>Here are some sample tasks:</Trans>
        </Text>
    </View>
);

const myPlanIntroWithEmptyPlan = (props: RouterProps): JSX.Element => (
    <Text style={[
        { textAlign: 'left' },
        { marginBottom: 20 },
    ]}>
        <Trans>You haven't personalized your Plan yet. Would you like to
        <Text onPress={(): void => props.history.push(routePath(Routes.Questionnaire))} style={[{ color: 'blue' }]}>
        <Trans>answer some questions</Trans></Text> to get your most relevant tasks?</Trans>
    </Text>
);
