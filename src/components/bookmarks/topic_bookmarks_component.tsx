import React from 'react';
import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions, TaskListComponent } from '../topics/task_list_component';
import { View } from 'native-base';
import { colors } from '../../application/styles';
import { Trans } from '@lingui/react';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { History } from 'history';

export interface TopicBookmarksProps {
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly history: History;
    readonly scrollOffset: number;
}

type Props = TopicBookmarksProps & TaskListActions;

export const TopicBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={{backgroundColor: colors.lightGrey, paddingTop: 13}}>
        <TaskListComponent
            topic={undefined}
            tasks={props.bookmarkedTopics}
            bookmarkedTopicsIdList={R.map((topic: TopicListItem) => topic.id, props.bookmarkedTopics)}
            emptyTaskListContent={
                <EmptyBookmarksComponent
                    title={<Trans>No topics to show</Trans>}
                />
            }
            headerContent={<View />}
            history={props.history}
            bookmarkTopic={props.bookmarkTopic}
            unbookmarkTopic={props.unbookmarkTopic}
            scrollOffset={props.scrollOffset}
            saveScrollOffset={props.saveScrollOffset}
        />
    </View>
);
