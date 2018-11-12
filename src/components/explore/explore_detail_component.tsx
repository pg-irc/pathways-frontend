import React from 'react';
import { Content } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { RouterProps } from '../../application/routing';
import { Id as TaskId, AddToSavedListAction } from '../../stores/tasks';
import { ExploreDetailHeadingComponent } from './explore_detail_heading_component';
import { ExploreDetailContentComponent } from './explore_detail_content_component';
import { ExploreDetailRelatedTasksComponent } from './explore_detail_related_tasks_component';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { applicationStyles } from '../../application/styles';

export interface ExploreDetailProps {
    readonly section: ExploreSection;
    readonly tasks: ReadonlyArray<TaskListItem>;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface ExploreDetailActions {
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}

type Props = ExploreDetailProps & ExploreDetailActions & RouterProps;

export const ExploreDetailComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        return (
            <Content padder style={applicationStyles.body}>
                <ExploreDetailHeadingComponent />
                <ExploreDetailContentComponent
                    section={props.section}
                    collapseIntroduction={props.tasks.length > 0}
                />
                <ExploreDetailRelatedTasksComponent
                    relatedTasks={props.tasks}
                    history={props.history}
                    savedTasksIdList={props.savedTasksIdList}
                    addToSavedList={props.addToSavedList}
                />
            </Content>
        );
    };
