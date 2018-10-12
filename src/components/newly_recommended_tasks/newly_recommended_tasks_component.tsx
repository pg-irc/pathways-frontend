import React from 'react';
import { Task } from '../../selectors/tasks/task';
import { View, Text, Button, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../application/styles';
import { emptyComponent } from '../empty_component/empty_component';
import { Id } from '../../stores/tasks';
import { Trans } from '@lingui/react';
import { DismissNewlyAddedTasksPopupAction } from '../../stores/questionnaire/actions';
import { SaveTheseTasksToMyPlanAction } from '../../stores/tasks/actions';
import * as R from 'ramda';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';

export interface NewlyRecommendedTasksComponentProps {
    readonly showQuestionnairePopup: boolean;
    readonly newlyRecommendedTasks: ReadonlyArray<Task>;
}

export interface NewlyRecommendedTasksComponentActions {
    readonly saveToMyPlan: (tasks: ReadonlyArray<Id>) => SaveTheseTasksToMyPlanAction;
    readonly dismissPopup: () => DismissNewlyAddedTasksPopupAction;
}

type Props = NewlyRecommendedTasksComponentProps & NewlyRecommendedTasksComponentActions;

export const NewlyRecommendedTasksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {

    if (!props.showQuestionnairePopup || R.isEmpty(props.newlyRecommendedTasks)) {
        return emptyComponent();
    }
    const tasks = props.newlyRecommendedTasks;
    const taskIds = R.map((task: Task): Id => task.id, tasks);
    const saveTasksToMyPlan = (): SaveTheseTasksToMyPlanAction => props.saveToMyPlan(taskIds);

    return <View style={styles.fadeout}>
        <View style={styles.dialog}>
            <Text style={styles.heading}><Trans>New tasks</Trans></Text>
            <Text style={styles.intro}>
                <Trans>Based on the answers you just gave, we have found these tasks that may be of interest to you</Trans>
            </Text>
            <Content padder style={styles.taskList}>
                {R.map((task: Task) => (
                    <Text key={task.id} style={styles.task}>
                        {task.title}
                    </Text>
                ), tasks)}
            </Content>
            <Button style={styles.button} onPress={saveTasksToMyPlan}>
                <Text style={styles.buttonText}>
                    <Trans>Add these tasks to My Plan</Trans>
                </Text>
            </Button>
            <Button style={styles.button} onPress={props.dismissPopup}>
                <Text style={styles.buttonText}>
                    <Trans>Close, do not add tasks to My Plan</Trans>
                </Text>
            </Button>
        </View >
    </View>;
};

const styles = StyleSheet.create({
    fadeout: {
        backgroundColor: colors.darkGreyWithAlpha,
        position: 'absolute',
        bottom: 0,
        top: getStatusBarHeightForPlatform(),
        left: 0,
        right: 0,
    },
    dialog: {
        backgroundColor: colors.lighterGrey,
        padding: 10,
        position: 'absolute',
        bottom: 100,
        top: 100,
        left: 20,
        right: 20,
    },
    heading: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 30,
    },
    intro: {
        color: colors.black,
        fontSize: 18,
        textAlign: 'left',
    },
    taskList: {
        flex: 1,
        padding: 10,
    },
    task: {
        color: colors.black,
        fontSize: 18,
        textAlign: 'left',
    },
    buttonView: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
    },
    button: {
        alignSelf: 'stretch',
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
    },
});
