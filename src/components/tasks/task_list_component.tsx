import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { View } from 'native-base';
import { Trans } from '@lingui/react';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { EmptyListComponent } from '../empty_component/empty_list_component';

export interface TaskListProps {
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly emptyTaskListComponent: JSX.Element;
    readonly savedTasksIdList: ReadonlyArray<Id>;
    readonly history: History;
}

export interface TaskListActions {
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: Id) => RemoveFromSavedListAction;
}

export const noTasksAddedYetTextComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics bookmarked yet</Trans>} />
);

export const noTasksRecommendedTextComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to recommend</Trans>} />
);

type Props = TaskListProps & TaskListActions;

export const TaskListComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    R.isEmpty(props.tasks) ? props.emptyTaskListComponent : <NonEmptyTaskListComponent {...props} />
);

const NonEmptyTaskListComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View>
        {R.map((task: TaskListItem) =>
            <TaskListItemComponent
                key={task.id}
                task={task}
                savedTasksIdList={props.savedTasksIdList}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                goToTaskDetail={goToRouteWithParameter(Routes.TaskDetail, task.id, props.history)}
            />, props.tasks)}
    </View>
);
