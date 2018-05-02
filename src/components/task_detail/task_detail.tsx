import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { TaskLabel } from '../task_label/task_label';

interface Props {
    task: Task;
}

interface Actions {
    addToTaskList: () => void;
    deleteFromTaskList: () => void;
    markTaskAsComplete: () => void;
    shareTask: () => void;
    starTask: () => void;
}

const getColorForLabel = (label: string): string => {
    switch (label.toLocaleLowerCase()) {
        case 'important':
            return '#f5a623';
        case 'do soon':
            return '#bd10e0';
        case 'free':
            return '#7dd322';
        default:
            return '#03a9f4';
    }
};

export interface TaskDefinition {
    id: number;
    category: string;
    description: string;
    labels: string[];
}

export interface Task {
    id: number;
    complete: boolean;
    starred: boolean;
    taskDefinition: TaskDefinition;
}

export const TaskDetail: React.SFC<Props & Actions> = (props: Props & Actions): JSX.Element => (
    <TouchableOpacity onPress={props.starTask}>
        <View style={styles.wrapper}>
            <View style={styles.leftColumn}>
                <Text>{props.task.starred ? 'Starred' : 'Not starred'}</Text>
            </View>
            <View style={styles.centerColumn}>
                <View style={styles.stackedItems}>
                    <Text>{props.task.taskDefinition.description}</Text>
                    <View style={styles.inlineItems}>
                        {props.task.taskDefinition.labels.map((label: string, index: number) =>
                         <TaskLabel text={label} color={getColorForLabel(label)} key={index} />)}
                    </View>
                </View>
            </View>
            <View style={styles.rightColumn}>
                <View style={styles.stackedItems}>
                    <Text>{'...'}</Text>
                    <Text>{props.task.taskDefinition.category}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);
