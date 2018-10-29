import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles, textStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListComponent, noTasksAddedYetTextComponent } from './task_list';
import { Trans } from '@lingui/react';
import { TaskListItemActions } from './task_list_item';
import { RouterProps } from '../../application/routing';
import { emptyComponent } from '../empty_component/empty_component';
import { Id } from '../../stores/tasks';

interface RelatedTasksProps {
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<Id>;
}
type AllRelatedTasksProps = RelatedTasksProps & TaskListItemActions & RouterProps;

export const RelatedTasksComponent: React.StatelessComponent<AllRelatedTasksProps> = (props: AllRelatedTasksProps): JSX.Element => {
    if (props.relatedTasks.length === 0) {
        return emptyComponent();
    }
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>RELATED TASKS</Trans></Text>
            <TaskListComponent
                {...props}
                tasks={props.relatedTasks}
                emptyTaskListComponent={noTasksAddedYetTextComponent()}
            />
        </View>
    );
};
