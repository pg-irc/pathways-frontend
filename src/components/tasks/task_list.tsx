import React from 'react';
import * as R from 'ramda';
import { View } from 'native-base';
import { TaskListItem } from '../../selectors/tasks';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListItemComponent, TaskListItemActions, TaskListItemStyleProps } from './task_list_item';
import { RouterProps } from '../../application/routing';

export interface TaskListProps extends TaskListItemStyleProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
}
export interface TaskListActions extends TaskListItemActions {
    readonly shouldDisplayTaskInteractions?: (taskId: TaskId) => boolean;
}
type AllTaskListProps = TaskListProps & TaskListActions & RouterProps;

export const TaskListComponent: React.StatelessComponent<AllTaskListProps> = (props: AllTaskListProps): JSX.Element => (
    <View>
        {R.map((task: TaskListItem) =>
            <TaskListItemComponent
                {...task}
                {...props}
                key={task.id}
                displayTaskInteractions={displayTaskInteractions(task.id, props.shouldDisplayTaskInteractions)}
            />, props.tasks)}
    </View>
);

const displayTaskInteractions = (taskId: TaskId, callback: (taskId: TaskId) => boolean): boolean => {
    return callback ? callback(taskId) : true;
};
