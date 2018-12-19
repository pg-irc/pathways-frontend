import React from 'react';
import { History } from 'history';
import { View, Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListComponent, noTasksAddedYetTextComponent, TaskListActions } from './task_list_component';
import { Trans } from '@lingui/react';
import { emptyComponent } from '../empty_component/empty_component';
import { Id } from '../../stores/tasks';

export interface TaskDetailRelatedTasksProps {
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<Id>;
    readonly history: History;
}

type Props = TaskDetailRelatedTasksProps & TaskListActions;

export const TaskDetailRelatedTasksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    if (props.relatedTasks.length === 0) {
        return emptyComponent();
    }
    return (
        <View padder>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { marginBottom: 3 } ]}>
                <Trans>RELATED TOPICS</Trans>
            </Text>
            <TaskListComponent
                tasks={props.relatedTasks}
                emptyTaskListComponent={noTasksAddedYetTextComponent()}
                savedTasksIdList={props.savedTasksIdList}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                history={props.history}
            />
        </View>
    );
};
