import React from 'react';
import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { View } from 'native-base';
import { colors } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { emptyList } from '../../application/images';
import { Trans } from '@lingui/react';

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
                emptyTaskListContent={<EmptyListComponent title={<Trans>No topics to show</Trans>} imageSource={emptyList} />}
                headerContent={<View />}
            />
        </View>
    );
};