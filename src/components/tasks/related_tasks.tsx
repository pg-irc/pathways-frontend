import React from 'react';
import { View, Text } from 'native-base';
import R from 'ramda';
import { applicationStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListComponent, noTasksAddedYetTextComponent } from '../tasks/task_list';
import { Trans } from '@lingui/react';
import { TaskListItemActions } from './task_list_item';
import { RouterProps } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';

interface RelatedTasksProps {
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}
type AllRelatedTasksProps = RelatedTasksProps & TaskListItemActions & RouterProps;

export const RelatedTasksComponent: React.StatelessComponent<AllRelatedTasksProps> = (props: AllRelatedTasksProps): JSX.Element => {
    if (props.relatedTasks.length === 0) {
        return emptyComponent();
    }
    const shouldDisplayTaskInteractions = (taskId: TaskId): boolean => (
        R.none((id: TaskId) => id === taskId, props.savedTasks)
    );
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>RELATED TASKS</Trans></Text>
            <TaskListComponent
                {...props}
                tasks={props.relatedTasks}
                shouldDisplayTaskInteractions={shouldDisplayTaskInteractions}
                emptyTaskListComponent={noTasksAddedYetTextComponent()}
            />
        </View>
    );
};
