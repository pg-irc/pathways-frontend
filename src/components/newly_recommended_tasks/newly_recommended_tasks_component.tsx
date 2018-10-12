import React from 'react';
import { Task } from '../../selectors/tasks/task';
import { View, Text, Button, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../application/styles';
import * as R from 'ramda';

export const dummyTasks: ReadonlyArray<Task> = [{
    id: 'id1', title: 'The first task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id2', title: 'The second task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id3', title: 'The third task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id4', title: 'The fourth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id5', title: 'The fifth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id6', title: 'The sixth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id7', title: 'The seventh task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id8', title: 'The eighth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id9', title: 'The ninth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id10', title: 'The tenth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id11', title: 'The eleventh task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id12', title: 'The twelfth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id13', title: 'The thirteenth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id14', title: 'The fourteenth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}, {
    id: 'id15', title: 'The fifteenth task', description: 'description',
    taxonomyTerms: [], exploreSection: undefined, isRecommended: true,
    relatedTasks: [], relatedArticles: [], serviceQuery: '', completed: false,
}];

export interface NewlyRecommendedTasksComponentProps {
    readonly showQuestionnairePopup: boolean;
    readonly newlyRecommendedTasks: ReadonlyArray<Task>;
}

export interface NewlyRecommendedTasksComponentActions {
}

type Props = NewlyRecommendedTasksComponentProps & NewlyRecommendedTasksComponentActions;

export const NewlyRecommendedTasksComponent: React.StatelessComponent<Props> = (_: Props): JSX.Element => {
    // const status = `props.isPopupNeeded=${props.isPopupNeeded}\nnewlyRecommendedTasks=${props.newlyRecommendedTasks.length}`;
    // // tslint:disable-next-line:no-expression-statement
    // Alert.alert('status', status);

    // if (!props.isPopupNeeded || R.isEmpty(props.newlyRecommendedTasks)) {
    //     return emptyComponent();
    // }
    // const tasks = props.newlyRecommendedTasks;
    const tasks = R.take(12, dummyTasks);

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
        <Button style={styles.button}>
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
