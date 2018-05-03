import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface Props {
    color: string;
    text: string;
}

export const TaskLabel: React.SFC<Props> = (props: Props): JSX.Element => (
    <View style={[styles.label, {backgroundColor: props.color}]}>
        <Text style={styles.labelText}>{props.text.toUpperCase()}</Text>
    </View>
);