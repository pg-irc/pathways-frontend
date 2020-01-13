import React from 'react';
import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions, NoTasksAddedComponent, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { View } from 'native-base';
import { colors } from '../../application/styles';

export interface TopicBookmarksProps {
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = TopicBookmarksProps & TaskListActions & RouterProps;

export const TopicBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <View style={{backgroundColor: colors.lightGrey, paddingTop: 13}}>
            <TaskListComponent
                {...props}
                tasks={props.bookmarkedTopics}
                savedTasksIdList={R.map((topic: TopicListItem) => topic.id, props.bookmarkedTopics)}
                emptyTaskListContent={<NoTasksAddedComponent />}
                headerContent={<View />}
            />
        </View>
    );
};