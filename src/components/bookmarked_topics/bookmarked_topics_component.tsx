import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, noTasksAddedYetTextComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, applicationStyles } from '../../application/styles';

export interface BookmarkedTopicsProps {
    readonly bookmarkedTopics: ReadonlyArray<TaskListItem>;
}

type Props = BookmarkedTopicsProps & TaskListActions & RouterProps;

export const BookmarkedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <View padder style={[applicationStyles.body, { flex: 1 }]}>
            <Text style={textStyles.headlineH1StyleBlackLeft}>
                <Trans>Bookmarked Topics</Trans>
            </Text>
            <TaskListComponent
                {...props}
                tasks={props.bookmarkedTopics}
                emptyTaskListComponent={noTasksAddedYetTextComponent()}
                savedTasksIdList={R.map((topic: TaskListItem) => topic.id, props.bookmarkedTopics)}
                loadOnDemand={true}
            />
        </View>
    );
};