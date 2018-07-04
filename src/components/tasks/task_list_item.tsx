import React from 'react';
import { ListItem, Text, Button, Icon, Grid, Col, Row } from 'native-base';
import { taskStyles } from './styles';
import { applicationStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks';
import { AddToSavedListAction, Id as TaskId } from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';
import { I18nManager } from 'react-native';

export interface TaskListItemStyleProps {
    readonly listItemStyle?: object;
}
export interface TaskListItemProps extends TaskListItemStyleProps, TaskListItem {
    readonly displayTaskInteractions: boolean;
}
export interface TaskListItemActions {
    readonly goToTaskDetail: (taskId: TaskId) => SetTaskDetailPageAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}
type AllTaskListItemProps = TaskListItemProps & TaskListItemActions;

export const TaskListItemComponent: React.StatelessComponent<AllTaskListItemProps> = (props: AllTaskListItemProps): JSX.Element => {
    const goToTaskDetail = (): SetTaskDetailPageAction => props.goToTaskDetail(props.id);
    return (
        <ListItem style={props.listItemStyle} button noIndent onPress={goToTaskDetail}>
            <Grid>
                <Row>
                    {props.displayTaskInteractions ? renderTaskInteractions(props) : undefined}
                    <Col size={props.displayTaskInteractions ? 70 : 80}>
                        <Row>
                            <Text numberOfLines={2}>{props.title}</Text>
                        </Row>
                    </Col>
                    <Col size={20}>
                        <Row style={taskStyles.rightColumn}>
                            <Icon style={taskStyles.icon} name='star-circle' type='MaterialCommunityIcons'/>
                            <Icon style={taskStyles.icon} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};

const renderTaskInteractions = (props: AllTaskListItemProps): JSX.Element => {
    const addToSavedList = (): AddToSavedListAction => props.addToSavedList(props.id);
    return (
        <Col size={10}>
            {props.addToSavedList ? renderAddButton(addToSavedList) : renderDragButton()}
        </Col>
    );
};

const renderAddButton = (onPress: () => void): JSX.Element => (
    <Button dark transparent iconRight onPress={onPress}>
        <Icon style={applicationStyles.bold} name='add' />
    </Button>
);

const renderDragButton = (): JSX.Element => (
    <Button dark transparent iconRight>
        <Icon style={applicationStyles.bold} name='drag-vertical' type='MaterialCommunityIcons' />
    </Button>
);
