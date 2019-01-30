import React from 'react';
import { Text, View } from 'native-base';
import { colors } from '../../application/styles';

export interface EmptyListProps {
    readonly message: JSX.Element;
}

export const EmptyListComponent: React.StatelessComponent<EmptyListProps> = (props: EmptyListProps): JSX.Element => (
    <View
        style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            alignItems: 'center',
        }}
    >
            <Text style={{ color: colors.darkerGrey }}>
                {props.message}
            </Text>
    </View>
);
