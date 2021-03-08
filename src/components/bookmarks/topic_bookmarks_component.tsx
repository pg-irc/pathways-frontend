import React from 'react';
import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions, TaskListComponent } from '../topics/task_list_component';
import { View } from 'native-base';
import { colors } from '../../application/styles';
import { Trans } from '@lingui/react';
import { EmptyBookmarksComponent } from './empty_bookmarks_component';
import { History } from 'history';
import { useLocation } from 'react-router-native';

export interface TopicBookmarksProps {
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
    readonly history: History;
}

type Props = TopicBookmarksProps & TaskListActions;

export const TopicBookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const location = useLocation();
    return (
        <View style={{backgroundColor: colors.lightGrey, paddingTop: 13}}>
            <TaskListComponent
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
                saveScrollOffset={props.saveScrollOffset}
                scrollOffset={location.state?.currentOffset || 0}
            />
        </View>
    );
};