import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import { task as styles } from './styles';
import { TaskActions } from './actions';
import * as selector from '../../selectors/tasks';
import * as stores from '../../stores/tasks';
import { SetMainPageAction } from '../../stores/page_switcher';

export interface Props {
}

export type Actions = TaskActions;

export const Task: React.StatelessComponent<selector.Task & Actions> = (props: selector.Task & Actions): JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.sideColumn}>
                {!props.addToSavedList ? undefined : (
                    <Button
                        onPress={(): stores.AddToSavedListAction => props.addToSavedList(props.id)}
                        dark
                        transparent
                    >
                        <Icon name='add' />
                    </Button>
                )}
            </View>
            <View style={styles.centerColumn}>
                <View style={styles.stackedItems}>
                    <Text>{props.title}</Text>
                </View>
            </View>
            <View style={styles.sideColumn}>
                <View style={styles.stackedItems}>
                    <Button
                        onPress={(): SetMainPageAction => props.goToTaskDetail(props.id)}
                        dark
                        transparent
                    >
                        <Icon name='arrow-forward' />
                    </Button>
                </View>
            </View>
        </View>
    );
};
