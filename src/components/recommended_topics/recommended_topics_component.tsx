import React from 'react';
import { Id as TaskId } from '../../stores/tasks';
import { Id as AnswerId } from '../../stores/questionnaire';
import { Content } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListItemActions } from '../tasks/task_list_item_component';
import { TaskListComponent, noTasksRecommendedTextComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { PersonalizeComponent } from '../home_page/personalize_component';
import { EmptyComponent } from '../empty_component/empty_component';

export interface RecommendedTopicsProps {
    readonly chosenAnswers: ReadonlyArray<AnswerId>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TaskListItem>;
}

type Props = RecommendedTopicsProps & TaskListItemActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Content padder>
            {props.chosenAnswers.length === 0 ? <PersonalizeComponent history={props.history} /> : <EmptyComponent />}
            <TaskListComponent
                {...props}
                tasks={props.recommendedTopics}
                emptyTaskListComponent={noTasksRecommendedTextComponent()}
                savedTasksIdList={props.savedTasksIdList}
            />
        </Content>
    );
};