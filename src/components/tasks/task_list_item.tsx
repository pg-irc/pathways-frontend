import React from 'react';
import * as R from 'ramda';
import { computeStateListItemIcon, TaskStateListItemIcon } from './task_states';
import { View, Text, Icon } from 'native-base';
import { applicationStyles, values, colors } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { AddToSavedListAction, Id } from '../../stores/tasks';
import { I18nManager, TouchableOpacity } from 'react-native';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { stripMarkdown } from '../strip_markdown/strip_markdown';

export interface TaskListItemProps {
    readonly task: TaskListItem;
    readonly savedTasksIdList: ReadonlyArray<Id>;
}

export interface TaskListItemActions {
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
}

type Props = TaskListItemProps & TaskListItemActions & RouterProps;

export const TaskListItemComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const goToTaskDetail = goToRouteWithParameter(Routes.TaskDetail, props.task.id, props.history);
    const taskDescription = stripMarkdown(props.task.description);
    return (
        <TouchableOpacity
            onPress={goToTaskDetail}
            style={{
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                padding: 10,
                marginVertical: 3,
            }}
        >
            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ marginRight: 20 }}>
                        <TaskInteractions {...props} />
                    </View>
                    <View>
                        <Text numberOfLines={2} style={applicationStyles.p}>
                            {props.task.title}
                        </Text>
                        <Text note numberOfLines={1} style={{ textAlign: 'left' }}>
                            {taskDescription}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {props.task.isRecommended ? <IsRecommendedComponent /> : <EmptyComponent />}
                    <Icon style={{ fontSize: values.smallIconSize }} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const IsRecommendedComponent = (): JSX.Element => (
    <Icon style={{ fontSize: values.smallerIconSize, color: colors.sunYellow, marginRight: 3 }} name='star' type='FontAwesome' />
);

const TaskInteractions = (props: Props): JSX.Element => {
    const state = {
        isRecommended: props.task.isRecommended,
        isSaved: R.any((id: Id) => id === props.task.id, props.savedTasksIdList),
        isCompleted: props.task.completed,
    };
    return renderFromListItemIcon(props, computeStateListItemIcon(state));
};

const renderFromListItemIcon = (props: Props, listItemIcon: TaskStateListItemIcon): JSX.Element => {
    if (listItemIcon === TaskStateListItemIcon.Checked) {
        return renderCheckBox(checkedIcon());
    }
    if (listItemIcon === TaskStateListItemIcon.UnChecked) {
        return renderCheckBox(unCheckedIcon());
    }

    return renderAddButton((): AddToSavedListAction => props.addToSavedList(props.task.id));
};

const checkedIcon = (): string => 'check-square-o';

const unCheckedIcon = (): string => 'square-o';

const renderCheckBox = (icon: string): JSX.Element => (
    <Icon style={[{ fontSize: values.smallerIconSize, color: colors.topaz }]} name={icon} type='FontAwesome' />
);

const renderAddButton = (onPress: () => void): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        <Icon style={{ fontSize: values.smallIconSize, color: colors.topaz }} name='plus' type='FontAwesome' />
    </TouchableOpacity>
);
