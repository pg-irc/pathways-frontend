import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { colors, values } from '../../application/styles';

export interface EmptyListProps {
    readonly message: JSX.Element;
}

export const EmptyListComponent: React.StatelessComponent<EmptyListProps> = (props: EmptyListProps): JSX.Element => (
    <View style={{ flex: 1 }}>
        <View style={styles.wrapper}>
            <Text style={styles.message}>
                {props.message}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderRadius: values.lessRoundedBorderRadius,
        padding: 5,
    },
    message: {
        color: colors.darkerGrey,
    },
});
