// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { View, Content } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
import { applicationStyles } from '../../application/styles';
import { TaskDetailRelatedTasksComponent } from './task_detail_related_tasks_component';
import { goToRouteWithParameter } from '../../application/routing';
import { computeStateButtons, TaskStateButton } from './task_states';
import { Task } from '../../selectors/tasks/task';
import { Routes } from '../../application/routing';
import { TaskDetailHeadingComponent } from './task_detail_heading_component';
import { TaskDetailContentComponent } from './task_detail_content_component';
import { TaskDetailServicesButtonComponent } from './task_detail_services_button_component';
import { TaskDetailMenuComponent } from './task_detail_menu_component';

export interface TaskDetailProps {
    readonly task: Task;
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
    const onServicesButtonPress = goToRouteWithParameter(Routes.TaskDetailServices, task.id, props.history);
    return (
        <View style={{ flex: 1 }}>
            <Content style={applicationStyles.body}>
                <TaskDetailHeadingComponent />
                <TaskDetailContentComponent task={task} />
                <TaskDetailRelatedTasksComponent
                    savedTasksIdList={props.savedTasksIdList}
                    addToSavedList={props.addToSavedList}
                    history={props.history}
                    relatedTasks={task.relatedTasks} />
            </Content>
            <TaskDetailServicesButtonComponent
                onServicesButtonPress={onServicesButtonPress}
            />
            <TaskDetailMenuComponent
                buttons={getTaskDetailMenuButtons(props)}
                addButtonOnPress={(): void => { props.addToSavedList(task.id); }}
                removeButtonOnPress={(): void => { props.removeFromSavedList(task.id); }}
                doneButtonOnPress={(): void => { props.toggleCompleted(task.id); props.removeFromSavedList(task.id); }}
                notDoneButtonOnPress={(): void => { props.toggleCompleted(task.id); props.addToSavedList(task.id); }}
            />
        </View>
    );
};

const getTaskDetailMenuButtons = (props: Props): ReadonlyArray<TaskStateButton> => {
    const task = props.task;
    const taskState = {
        isRecommended: task.isRecommended,
        isSaved: R.any((id: TaskId) => id === task.id, props.savedTasksIdList),
        isCompleted: task.completed,
    };
    return computeStateButtons(taskState);
};
