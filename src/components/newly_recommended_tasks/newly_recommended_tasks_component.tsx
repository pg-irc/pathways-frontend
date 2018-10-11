import React from 'react';
import { Task } from '../../selectors/tasks/task';
import { View, Text, Button, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../application/styles';
import * as R from 'ramda';
import { emptyComponent } from '../empty_component/empty_component';

export interface NewlyRecommendedTasksComponentProps {
    readonly showQuestionnairePopup: boolean;
    readonly newlyRecommendedTasks: ReadonlyArray<Task>;
}

export interface NewlyRecommendedTasksComponentActions {
    readonly dismissPopup: () => void;
}

type Props = NewlyRecommendedTasksComponentProps & NewlyRecommendedTasksComponentActions;

export const NewlyRecommendedTasksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {

    if (!props.showQuestionnairePopup || R.isEmpty(props.newlyRecommendedTasks)) {
        return emptyComponent();
    }
    const tasks = props.newlyRecommendedTasks;

    return <View style={styles.component}>
        <Text style={styles.heading}>New Tasks</Text>
        <Text style={styles.intro}>Based on the answers you just gave, we have found these tasks that may be of interest to you</Text>
        <Content padder style={styles.taskList}>
            {R.map((task: Task) => (
                <Text key={task.id} style={styles.task}>
                    {task.title}
                </Text>
            ), tasks)}
        </Content>
        <Button style={styles.button}>
            <Text style={styles.buttonText}>Add these tasks to My Plan</Text>
        </Button>
        <Button style={styles.button} onPress={props.dismissPopup}>
            <Text style={styles.buttonText}>Close, do not add tasks to My Plan</Text>
        </Button>
    </View >;
};

const styles = StyleSheet.create({
    component: {
        backgroundColor: colors.lightGrey,
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
