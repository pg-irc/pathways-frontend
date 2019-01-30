import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/tasks';
import { View, Text } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, NoTasksRecommendedComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { PersonalizeComponent } from '../home/home_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { textStyles } from '../../application/styles';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly savedTopicsIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TaskListItem>;
}

type Props = RecommendedTopicsProps & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        {...props}
        tasks={props.recommendedTopics}
        savedTasksIdList={props.savedTopicsIdList}
        emptyTaskListContent={<NoTasksRecommendedComponent />}
        headerContent={<TaskListHeaderComponent {...props} />}
    />
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        {props.hasChosenAnswers ? <EmptyComponent /> : <PersonalizeComponent history={props.history} />}
        <Text style={textStyles.headlineH1StyleBlackLeft}>
            <Trans>Recommended Topics</Trans>
        </Text>
    </View>
);
