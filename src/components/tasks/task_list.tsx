import React from 'react';
import * as R from 'ramda';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { TaskListItem } from '../../selectors/tasks';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListItemComponent, TaskListItemActions, TaskListItemStyleProps } from './task_list_item';
import { RouterProps } from '../../application/routing';

export interface TaskListProps extends TaskListItemStyleProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly emptyTaskListComponent: JSX.Element;
}

export interface TaskListActions extends TaskListItemActions {
    readonly shouldDisplayTaskInteractions?: (taskId: TaskId) => boolean;
}

export const noTasksAddedYetTextComponent = (): JSX.Element => (
    <Text style={[
        { textAlign: 'left' },
    ]}>
        <Trans>No tasks added yet</Trans>
    </Text>
);

export const noTasksRecommendedTextComponent = (): JSX.Element => (
    <Text style={[
        { textAlign: 'left' },
    ]}>
        <Trans>No tasks to recommend</Trans>
    </Text>
);

type AllTaskListProps = TaskListProps & TaskListActions & RouterProps;

export const TaskListComponent: React.StatelessComponent<AllTaskListProps> = (props: AllTaskListProps): JSX.Element => (
    R.isEmpty(props.tasks) ? props.emptyTaskListComponent : <NonEmptyTaskListComponent {...props} />
);

const NonEmptyTaskListComponent: React.StatelessComponent<AllTaskListProps> = (props: AllTaskListProps): JSX.Element => (
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
