import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { RouterProps } from '../../application/routing';
import { Id as TaskId, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { ExploreDetailContentComponent } from './explore_detail_content_component';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { textStyles } from '../../application/styles';
import { TaskListComponent, NoTasksAddedComponent } from '../tasks/task_list_component';

export interface ExploreDetailProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface ExploreDetailActions {
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: TaskId) => RemoveFromSavedListAction;
}

type Props = ExploreDetailProps & ExploreDetailActions & RouterProps;

export const ExploreDetailComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        return (
            <TaskListComponent
                tasks={props.tasks}
                savedTasksIdList={props.savedTasksIdList}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                history={props.history}
                emptyTaskListContent={<NoTasksAddedComponent />}
                headerContent={<TaskListHeaderComponent {...props} />}
            />
        );
    };

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        <ExploreDetailContentComponent
            section={props.section}
            sectionHasTasks={props.tasks.length > 0}
        />
        <Text style={[textStyles.headlineH5StyleBlackLeft, { marginBottom: 3 }]}>
            <Trans>EXPLORE TOPICS</Trans>
        </Text>
    </View>
);
