import React from 'react';
import { Text } from 'react-native';
import { textStyles, values } from '../../application/styles';

interface Props {
    readonly descriptor: JSX.Element;
}

export const DescriptorComponent = (props: Props): JSX.Element => (
    <Text style={[
        textStyles.headlineH5StyleBlackLeft,
        {
            marginTop: 20,
            marginBottom: 5,
            paddingHorizontal: values.backgroundTextPadding,
        },
    ]}
    >
        {props.descriptor}
    </Text>
);