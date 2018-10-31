import React from 'react';
import * as R from 'ramda';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListItemComponent, TaskListItemActions } from './task_list_item_component';
import { Id } from '../../stores/tasks';
import { RouterProps } from '../../application/routing';
import { colors, values } from '../../application/styles';

export interface TaskListProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly emptyTaskListComponent: JSX.Element;
    readonly savedTasksIdList: ReadonlyArray<Id>;
}

export const noTasksAddedYetTextComponent = (): JSX.Element => (
    buildNoTasksMessage(<Trans>No tasks added yet</Trans>)
);

export const noTasksRecommendedTextComponent = (): JSX.Element => (
    buildNoTasksMessage(<Trans>No tasks to recommend</Trans>)
);

export const noTasksCompletedTextComponent = (): JSX.Element => (
    buildNoTasksMessage(<Trans>No tasks completed</Trans>)
);

const buildNoTasksMessage = (noTasksMessage: JSX.Element): JSX.Element => (
    <View style={styles.noTaskWrapper}>
        <Text style={styles.noTaskText}>
            {noTasksMessage}
        </Text>
    </View>
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

const styles = StyleSheet.create({
    noTaskWrapper: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderRadius: values.lessRoundedBorderRadius,
        padding: 5,
    },
    noTaskText: {
        color: colors.darkerGrey,
    },
});
