// tslint:disable:no-expression-statement
import React from 'react';
import { History } from 'history';
import { Content } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
import { applicationStyles } from '../../application/styles';
import { TaskDetailRelatedTasksComponent } from './task_detail_related_tasks_component';
import { goToRouteWithParameter } from '../../application/routing';
import { Task } from '../../selectors/tasks/task';
import { Routes } from '../../application/routing';
import { TaskDetailHeadingComponent } from './task_detail_heading_component';
import { TaskDetailContentComponent } from './task_detail_content_component';
import { scrollToComponent } from '../main/main_page_switcher';

export interface TaskDetailProps {
    readonly task: Task;
    readonly taskIsBookmarked: boolean;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly history: History;
}
export interface TaskDetailActions {
    readonly toggleCompleted: (taskId: TaskId) => ToggleCompletedAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: TaskId) => RemoveFromSavedListAction;
}

type Props = TaskDetailProps & TaskDetailActions;

export const TaskDetailComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const task = props.task;
    const onServicesButtonPress = goToRouteWithParameter(Routes.Services, task.id, props.history);
    const taskHead = <TaskDetailHeadingComponent />;
    return (
        <Content style={applicationStyles.body} ref={(ref: any): void => scrollToComponent(ref, taskHead)}>
            {taskHead}
            <TaskDetailContentComponent
                task={task}
                onServicesTextPress={onServicesButtonPress}
            />
            <TaskDetailRelatedTasksComponent
                savedTasksIdList={props.savedTasksIdList}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                history={props.history}
                relatedTasks={task.relatedTasks}
            />
        </Content>
    );
};
