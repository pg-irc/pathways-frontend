import React from 'react';
import { View } from 'native-base';
import { Task } from '../../selectors/tasks';
import { TaskListItemComponent, TaskListItemActions, TaskListItemStyleProps } from './task_list_item';
import R from 'ramda';

export interface TaskListProps extends TaskListItemStyleProps {
    readonly tasks: ReadonlyArray<Task>;
}
export interface TaskListActions extends TaskListItemActions {
    readonly shouldDisplayTaskInteractions?: (task: Task) => boolean;
}
type AllTaskListProps = TaskListProps & TaskListActions;

export const TaskListComponent: React.StatelessComponent<AllTaskListProps> = (props: AllTaskListProps): JSX.Element => (
    <View>
        {R.map((task: Task) =>
            <TaskListItemComponent
                key={task.id}
                listItemStyle={props.listItemStyle}
                goToTaskDetail = {props.goToTaskDetail}
                addToSavedList = {props.addToSavedList}
                displayTaskInteractions={displayTaskInteractions(task, props.shouldDisplayTaskInteractions)}
                {...task}
            />, props.tasks)}
    </View>
);

const displayTaskInteractions = (task: Task, callback: (task: Task) => boolean): boolean => {
    return callback ? callback(task) : true;
};
