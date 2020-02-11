import React from 'react';
import { Text } from 'react-native';
import { textStyles } from '../../application/styles';

interface Props {
    readonly value: string;
}

export const SuggestingEnabledComponent = (props: Props): JSX.Element => (
    <Text style={textStyles.suggestionText}>
        {props.value}
    </Text>
);