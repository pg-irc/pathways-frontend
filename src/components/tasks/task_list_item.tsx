import React from 'react';
import * as R from 'ramda';
import { computeStateListItemIcon, TaskStateListItemIcon } from './task_states';
import { View, ListItem, Text, Button, Icon, Grid, Col, Row } from 'native-base';
import { taskStyles } from './styles';
import { applicationStyles, values } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { AddToSavedListAction, Id } from '../../stores/tasks';
import { I18nManager } from 'react-native';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';

export interface TaskListItemStyleProps {
    readonly listItemStyle?: object;
}

export interface TaskListItemProps extends TaskListItemStyleProps {
    readonly task: TaskListItem;
    readonly savedTasksIdList: ReadonlyArray<Id>;
}

export interface TaskListItemActions {
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
}

type Props = TaskListItemProps & TaskListItemActions & RouterProps;

export const TaskListItemComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const goToTaskDetail = goToRouteWithParameter(Routes.TaskDetail, props.task.id, props.history);
    return (
        <ListItem style={props.listItemStyle} button noIndent noBorder onPress={goToTaskDetail}>
            <Grid>
                <Row>
                    <TaskInteractions {...props} />
                    <Col size={80}>
                        <Row>
                            <Text numberOfLines={2} style={[
                                { textAlign: 'left' },
                            ]}>
                                {props.task.title}
                            </Text>
                        </Row>
                    </Col>
                    <Col size={20}>
                        <Row style={taskStyles.rightColumn}>
                            {props.task.isRecommended ? <IsRecommendedComponent /> : <EmptyComponent />}
                            <Icon style={taskStyles.icon} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};

const IsRecommendedComponent = (): JSX.Element => (
    <Icon style={taskStyles.icon} name='star-circle' type='MaterialCommunityIcons' />
);

const TaskInteractions = (props: Props): JSX.Element => {
    const state = {
        isRecommended: props.task.isRecommended,
        isSaved: R.any((id: Id) => id === props.task.id, props.savedTasksIdList),
        isCompleted: props.task.completed,
    };
    return (
        <Col size={15}>
            {renderFromListItemIcon(props, computeStateListItemIcon(state))}
        </Col>
    );
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

const checkedIcon = (): string => 'checkbox-marked-outline';

const unCheckedIcon = (): string => 'checkbox-blank-outline';

const renderCheckBox = (icon: string): JSX.Element => (
    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
        <Icon style={[{ fontSize: values.smallerIconSize }]} name={icon} type='MaterialCommunityIcons' />
    </View>
);

const renderAddButton = (onPress: () => void): JSX.Element => (
    <Button dark transparent iconRight onPress={onPress}>
        <Icon style={[applicationStyles.bold]} name='add' />
    </Button>
);
