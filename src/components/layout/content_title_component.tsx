import React from 'react';
import { Text } from 'react-native';
import { textStyles, values } from '../../application/styles';

interface Props {
    readonly title: string;
}

export const ContentTitleComponent = (props: Props): JSX.Element => (
    <Text style={[textStyles.contentTitle, { paddingHorizontal: values.backgroundTextPadding }]}>
        {props.title}
    </Text>
);