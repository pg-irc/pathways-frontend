import React from 'react';
import { Text } from 'native-base';

interface Props {
    readonly string: string;
}

export const UpperCase: React.StatelessComponent<Props> = (props: Props): JSX.Element =>  (
    <Text>{props.string.toUpperCase()}</Text>
);