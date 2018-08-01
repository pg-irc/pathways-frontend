import React from 'react';
import { View, ListItem, Text, Button, Icon, Grid, Col, Row } from 'native-base';
import { taskStyles } from './styles';
import { applicationStyles, values } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks';
import { AddToSavedListAction, Id as TaskId } from '../../stores/tasks';
import { I18nManager } from 'react-native';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';

export interface TaskListItemStyleProps {
    readonly listItemStyle?: object;
}
export interface TaskListItemProps extends TaskListItemStyleProps, TaskListItem {
    readonly displayTaskInteractions: boolean;
}
export interface TaskListItemActions {
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
}
type AllTaskListItemProps = TaskListItemProps & TaskListItemActions & RouterProps;

export const TaskListItemComponent: React.StatelessComponent<AllTaskListItemProps> = (props: AllTaskListItemProps): JSX.Element => {
    const goToTaskDetail = goToRouteWithParameter(Routes.TaskDetail, props.id, props.history);
    return (
        <ListItem style={props.listItemStyle} button noIndent onPress={goToTaskDetail}>
            <Grid>
                <Row>
                    {props.displayTaskInteractions ? renderTaskInteractions(props) : undefined}
                    <Col size={props.displayTaskInteractions ? 70 : 80}>
                        <Row>
                            <Text numberOfLines={2} style={[
                                { textAlign: 'left' },
                            ]}>
                                {props.title}
                            </Text>
                        </Row>
                    </Col>
                    <Col size={20}>
                        <Row style={taskStyles.rightColumn}>
                            {props.isRecommended ? <IsRecommendedComponent /> : <EmptyComponent />}
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

const renderTaskInteractions = (props: AllTaskListItemProps): JSX.Element => {
    const addToSavedList = (): AddToSavedListAction => props.addToSavedList(props.id);
    return (
        <Col size={15}>
            {props.addToSavedList ? renderAddButton(addToSavedList) : renderUncheckedBox()}
        </Col>
    );
};

const renderAddButton = (onPress: () => void): JSX.Element => (
    <Button dark transparent iconRight onPress={onPress}>
        <Icon style={[ applicationStyles.bold ]} name='add' />
    </Button>
);

const renderUncheckedBox = (): JSX.Element => (
    <View style={[ { flex: 1 }, { justifyContent: 'center' } ]}>
        <Icon style={[ { fontSize: values.smallerIconSize } ]}name='checkbox-blank-outline' type='MaterialCommunityIcons' />
    </View>
);
