import React from 'react';
import { Text } from 'native-base';
import { values, textStyles } from '../../application/styles';

// tslint:disable-next-line:no-any
export const ParagraphComponent: React.StatelessComponent = (props: any): JSX.Element => (
    <Text style={[textStyles.paragraphStyle, { paddingHorizontal: values.backgroundTextPadding, marginBottom: 20 }]}>
        {props.children}
    </Text>
);