import React from 'react';
import { ListItem, Text, Button, Icon, Grid, Col, Row, Body } from 'native-base';
import { task as styles } from './styles';
import { TaskActions } from './actions';
import * as selector from '../../selectors/tasks';
import * as stores from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';

export interface Props {
}

export type Actions = TaskActions;

export const Task: React.StatelessComponent<selector.Task & Actions> = (props: selector.Task & Actions): JSX.Element => {
    return (
        /* I've opened an issue here: https://github.com/GeekyAnts/NativeBase/issues/1967 regarding this TS error. */
        <ListItem noIndent style={styles.listItem} button onPress={(): void => alert('Navigate to task detail...')}>
            <Grid>
                <Row>
                    <Col size={15}>
                        {!props.addToSavedList ?
                            <Button
                                dark
                                transparent
                            >
                                <Icon name='menu' />
                            </Button>
                        :
                            <Button
                                onPress={(): stores.AddToSavedListAction => props.addToSavedList(props.id)}
                                dark
                                transparent
                            >
                                <Icon name='add' />
                            </Button>
                        }
                    </Col>
                    <Col size={70}>
                        <Row>
                            <Text numberOfLines={2}>{props.title}</Text>
                        </Row>
                    </Col>
                    <Col size={20}>
                        <Row style={styles.rightColumn}>
                            <Icon style={styles.starIcon} name='star-circle' type='MaterialCommunityIcons'/>
                            <Button
                                dark
                                transparent
                            >
                                <Icon name='arrow-forward' />
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};
