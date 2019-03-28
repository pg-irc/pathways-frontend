import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { TaskListActions, NoTasksAddedComponent, TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';

export interface BookmarkedTopicsProps {
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarkedTopicsProps & TaskListActions & RouterProps;

export const BookmarkedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <TaskListComponent
            {...props}
            tasks={props.bookmarkedTopics}
            savedTasksIdList={R.map((topic: TopicListItem) => topic.id, props.bookmarkedTopics)}
            emptyTaskListContent={<NoTasksAddedComponent />}
            headerContent={<TaskListHeaderComponent />}
        />
    );
};

const TaskListHeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);
