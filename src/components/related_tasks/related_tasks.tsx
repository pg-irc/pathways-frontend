import React from 'react';
import { View, Text } from 'native-base';
import R from 'ramda';
import { applicationStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListComponent } from '../tasks/task_list';
import { Trans } from '@lingui/react';
import { TaskListItemActions } from '../tasks/task_list_item';

interface RelatedTasksProps {
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly savedTasks: ReadonlyArray<TaskId>;
}
type AllRelatedTasksProps = RelatedTasksProps & TaskListItemActions;

export const RelatedTasksComponent: React.StatelessComponent<AllRelatedTasksProps> = (props: AllRelatedTasksProps): JSX.Element => {
    if (props.relatedTasks.length === 0) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    const shouldDisplayTaskInteractions = (taskId: TaskId): boolean => (
        R.none((id: TaskId) => id === taskId, props.savedTasks)
    );
    const componentProps = {
        tasks: props.relatedTasks,
        goToTaskDetail: props.goToTaskDetail,
        addToSavedList: props.addToSavedList,
        shouldDisplayTaskInteractions: shouldDisplayTaskInteractions,
    };
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>RELATED TASKS</Trans></Text>
            <TaskListComponent {...componentProps} />
        </View>
    );
};
