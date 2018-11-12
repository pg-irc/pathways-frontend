import React from 'react';
import { History } from 'history';
import { View, Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListComponent, noTasksAddedYetTextComponent, TaskListActions } from '../tasks/task_list_component';
import { Trans } from '@lingui/react';
import { emptyComponent } from '../empty_component/empty_component';
import { Id } from '../../stores/tasks';

export interface ExploreDetailRelatedTasksProps {
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<Id>;
    readonly history: History;
}

type Props = ExploreDetailRelatedTasksProps & TaskListActions;

export const ExploreDetailRelatedTasksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    if (props.relatedTasks.length === 0) {
        return emptyComponent();
    }
    return (
        <View padder>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { marginBottom: 3 } ]}>
                <Trans>EXPLORE TASKS</Trans>
            </Text>
            <TaskListComponent
                tasks={props.relatedTasks}
                emptyTaskListComponent={noTasksAddedYetTextComponent()}
                savedTasksIdList={props.savedTasksIdList}
                addToSavedList={props.addToSavedList}
                history={props.history}
            />
        </View>
    );
};
