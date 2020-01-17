import React from 'react';
import { View, Text } from 'react-native';
import { colors, values, getNormalFontFamily } from '../../application/styles';

export interface EmptyTaskListComponentProps {
    readonly message: JSX.Element;
}

export const EmptyTopicListComponent = (props: EmptyTaskListComponentProps): JSX.Element => (
    <View
        style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            borderRadius: values.lessRoundedBorderRadius,
            margin: 5,
            alignItems: 'center',
        }}
    >
        <Text style={{ color: colors.darkerGrey, fontFamily: getNormalFontFamily() }}>
            {props.message}
        </Text>
    </View>
);