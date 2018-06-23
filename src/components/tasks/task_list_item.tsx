import React from 'react';
import { ListItem, Text, Button, Icon, Grid, Col, Row } from 'native-base';
import { taskStyles } from './styles';
import { applicationStyles } from '../../application/styles';
import { TaskActions } from './actions';
import * as selector from '../../selectors/tasks';
import { AddToSavedListAction } from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';
import { I18nManager } from 'react-native';

export interface Props {
}

export type Actions = TaskActions;

export const TaskListItem: React.StatelessComponent<selector.Task & Actions> = (props: selector.Task & Actions): JSX.Element => {
    const addToSavedList = (): AddToSavedListAction => props.addToSavedList(props.id);
    const goToTaskDetail = (): SetTaskDetailPageAction => props.goToTaskDetail(props.id);
    const style = props.addToSavedList ? taskStyles.suggestedListItem : taskStyles.savedListItem;
    return (
        <ListItem style={style} button noIndent onPress={goToTaskDetail}>
            <Grid>
                <Row>
                    <Col size={10}>
                        {!props.addToSavedList ? getDragButton() : getSaveButton(addToSavedList) }
                    </Col>
                    <Col size={70}>
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

const getDragButton = (): JSX.Element => (
    <Button dark transparent iconRight>
        <Icon style={applicationStyles.bold} name='drag-vertical' type='MaterialCommunityIcons' />
    </Button>
);

const getSaveButton = (onPress: () => void): JSX.Element => (
    <Button dark transparent iconRight onPress={onPress}>
        <Icon style={applicationStyles.bold} name='add' />
    </Button>
);
