import React from 'react';
import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { TaskListActions, NoTasksAddedComponent, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { View } from 'native-base';

export interface TopicBookmarksProps {
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = TopicBookmarksProps & TaskListActions & RouterProps;

export const TopicBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <TaskListComponent
            {...props}
            tasks={props.bookmarkedTopics}
            savedTasksIdList={R.map((topic: TopicListItem) => topic.id, props.bookmarkedTopics)}
            emptyTaskListContent={<NoTasksAddedComponent />}
            headerContent={<View />}
        />
    );
};