// tslint:disable:no-class no-this readonly-keyword no-expression-statement
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

export class TaskDetailComponent extends React.Component<Props> {
    scrollViewRef: ScrollViewRef = undefined;

    constructor(props: Props) {
        super(props);
        this.setScrollViewRef = this.setScrollViewRef.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidUpdate(previousProps: Props): void {
        if (previousProps.task.id !== this.props.task.id) {
            this.scrollToTop();
        }
    }

    render(): JSX.Element {
        const task = this.props.task;
        const onServicesButtonPress = goToRouteWithParameter(Routes.Services, task.id, this.props.history);
        return (
            <Content style={applicationStyles.body} ref={this.setScrollViewRef}>
                <TaskDetailHeadingComponent />;
                <TaskDetailContentComponent
                    task={task}
                    onServicesTextPress={onServicesButtonPress}
                />
                <TaskDetailRelatedTasksComponent
                    savedTasksIdList={this.props.savedTasksIdList}
                    addToSavedList={this.props.addToSavedList}
                    removeFromSavedList={this.props.removeFromSavedList}
                    history={this.props.history}
                    relatedTasks={task.relatedTasks}
                />
            </Content>
        );
    }

    private setScrollViewRef(component: object): void {
        this.scrollViewRef = component as ScrollViewRef;
    }

    private scrollToTop(): void {
        this.scrollViewRef._root.scrollToPosition(0, 0, false);
    }
}
