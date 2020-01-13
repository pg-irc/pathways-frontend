import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { RouterProps } from '../../application/routing';
import { Id as TaskId, BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { ExploreDetailContentComponent } from './explore_detail_content_component';
import { TopicListItem } from '../../selectors/topics/types';
import { textStyles, values } from '../../application/styles';
import { TaskListComponent, NoTasksAddedComponent } from '../topics/task_list_component';

export interface ExploreDetailProps {
    readonly section: ExploreSection;
    readonly topics: ReadonlyArray<TopicListItem>;
    readonly bookmarkedTopics: ReadonlyArray<TaskId>;
}

export interface ExploreDetailActions {
    readonly bookmarkTopic: (topicId: TaskId) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: TaskId) => UnbookmarkTopicAction;
}

type Props = ExploreDetailProps & ExploreDetailActions & RouterProps;

export const ExploreDetailComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        return (
            <TaskListComponent
                tasks={props.topics}
                savedTasksIdList={props.bookmarkedTopics}
                bookmarkTopic={props.bookmarkTopic}
                unbookmarkTopic={props.unbookmarkTopic}
                history={props.history}
                emptyTaskListContent={<NoTasksAddedComponent />}
                headerContent={<TaskListHeaderComponent {...props} />}
            />
        );
    };

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <ExploreDetailContentComponent
            section={props.section}
            sectionHasTopics={props.topics.length > 0}
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
            <Trans>EXPLORE TOPICS</Trans>
        </Text>
    </View>
);
