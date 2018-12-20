import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/tasks';
import { Id as AnswerId } from '../../stores/questionnaire';
import { Content, Text } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, noTasksRecommendedTextComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { PersonalizeComponent } from '../home_page/personalize_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { textStyles, applicationStyles } from '../../application/styles';

export interface RecommendedTopicsProps {
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTopicsIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TaskListItem>;
}

type Props = RecommendedTopicsProps & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Content padder style={applicationStyles.body}>
            {props.chosenAnswers.length === 0 ? <PersonalizeComponent history={props.history} /> : <EmptyComponent />}
            <Text style={textStyles.headlineH1StyleBlackLeft}>
                <Trans>Recommended Topics</Trans>
            </Text>
            <TaskListComponent
                {...props}
                tasks={props.recommendedTopics}
                emptyTaskListComponent={noTasksRecommendedTextComponent()}
                savedTasksIdList={props.savedTopicsIdList}
            />
        </Content>
    );
};