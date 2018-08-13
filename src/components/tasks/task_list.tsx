import React from 'react';
import * as R from 'ramda';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListItemComponent, TaskListItemActions, TaskListItemStyleProps } from './task_list_item';
import { Id } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';

export interface TaskListProps extends TaskListItemStyleProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly emptyTaskListComponent: JSX.Element;
    readonly savedTasksIdList: ReadonlyArray<Id>;
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

export const noTasksCompletedTextComponent = (): JSX.Element => (
    <Text><Trans>No tasks completed</Trans></Text>
);

type Props = TaskListProps & TaskListItemActions & RouterProps;

export const TaskListComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    R.isEmpty(props.tasks) ? props.emptyTaskListComponent : <NonEmptyTaskListComponent {...props} />
);

const NonEmptyTaskListComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View>
        {R.map((task: TaskListItem) =>
            <TaskListItemComponent
                {...props}
                key={task.id}
                task={task}
            />, props.tasks)}
    </View>
);
