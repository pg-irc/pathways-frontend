import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions, NoTasksAddedComponent, TaskListComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors } from '../../application/styles';

export interface BookmarkedTopicsProps {
    readonly bookmarkedTopics: ReadonlyArray<TaskListItem>;
}

type Props = BookmarkedTopicsProps & TaskListActions & RouterProps;

export const BookmarkedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <TaskListComponent
            {...props}
            tasks={props.bookmarkedTopics}
            savedTasksIdList={R.map((topic: TaskListItem) => topic.id, props.bookmarkedTopics)}
            emptyTaskListContent={<NoTasksAddedComponent />}
            headerContent={<TaskListHeaderComponent />}
        />
    );
};

const TaskListHeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white }}>
        <Text style={textStyles.headlineH1StyleBlackLeft}>
            <Trans>Bookmarked Topics</Trans>
        </Text>
    </View>
);
