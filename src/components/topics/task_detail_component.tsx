// tslint:disable:no-expression-statement
import React from 'react';
import { Trans } from '@lingui/react';
import { History } from 'history';
import { Text, View } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/topics';
import { textStyles, values } from '../../application/styles';
import { goToRouteWithParameter } from '../../application/routing';
import { Topic } from '../../selectors/topics/topic';
import { Routes } from '../../application/routing';
import { TaskDetailContentComponent } from './task_detail_content_component';
import { TaskListComponent, NoTasksAddedComponent } from './task_list_component';
import { sendLinkPressedEvent, buildLinkContext } from '../../application/google_analytics';

export interface TaskDetailProps {
    readonly topic: Topic;
    readonly taskIsBookmarked: boolean;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly history: History;
    readonly currentPath: string;
}

export interface TaskDetailActions {
    readonly toggleCompleted: (topicId: TaskId) => ToggleCompletedAction;
    readonly addToSavedList: (topicId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (topicId: TaskId) => RemoveFromSavedListAction;
}

type Props = TaskDetailProps & TaskDetailActions;

export const TaskDetailComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        tasks={props.topic.relatedTopics}
        savedTasksIdList={props.savedTasksIdList}
        addToSavedList={props.addToSavedList}
        removeFromSavedList={props.removeFromSavedList}
        history={props.history}
        emptyTaskListContent={<NoTasksAddedComponent />}
        headerContent={<TaskListHeaderComponent {...props} />}
        headerContentIdentifier={props.topic.id}
    />
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <TaskDetailContentComponent
            topic={props.topic}
            onServicesTextPress={onServicesTextPress(props)}
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

const onServicesTextPress = (props: Props): () => void => {
    return (): void => {
        const linkContext = buildLinkContext('Topic', props.topic.title);
        const linkType = 'Button';
        const linkValue = 'Find related services near me';
        sendLinkPressedEvent(props.currentPath, linkContext, linkType, linkValue);
        goToRouteWithParameter(Routes.Services, props.topic.id, props.history)();
    };
};
