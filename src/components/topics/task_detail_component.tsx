import React from 'react';
import { Trans } from '@lingui/react';
import { History } from 'history';
import { Text, View } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/topics';
import { textStyles, values } from '../../application/styles';
import { goToRouteWithParameter } from '../../application/routing';
import { Task } from '../../selectors/topics/task';
import { Routes } from '../../application/routing';
import { TaskDetailContentComponent } from './task_detail_content_component';
import { TaskListComponent, NoTasksAddedComponent } from './task_list_component';

export interface TaskDetailProps {
    readonly task: Task;
    readonly taskIsBookmarked: boolean;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly history: History;
}

export interface TaskDetailActions {
    readonly toggleCompleted: (topicId: TaskId) => ToggleCompletedAction;
    readonly addToSavedList: (topicId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (topicId: TaskId) => RemoveFromSavedListAction;
}

type Props = TaskDetailProps & TaskDetailActions;

export const TaskDetailComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        tasks={props.task.relatedTasks}
        savedTasksIdList={props.savedTasksIdList}
        addToSavedList={props.addToSavedList}
        removeFromSavedList={props.removeFromSavedList}
        history={props.history}
        emptyTaskListContent={<NoTasksAddedComponent />}
        headerContent={<TaskListHeaderComponent {...props} />}
        headerContentIdentifier={props.task.id}
    />
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <TaskDetailContentComponent
            task={props.task}
            onServicesTextPress={goToRouteWithParameter(Routes.Services, props.task.id, props.history)}
        />
        <Text
            style={[
                textStyles.headlineH5StyleBlackLeft,
                {
                    paddingHorizontal: values.backgroundTextPadding,
                    paddingTop: 18,
                },
            ]}
        >
            <Trans>RELATED TOPICS</Trans>
        </Text>
    </View>
);
