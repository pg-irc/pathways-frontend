import React from 'react';
import { Text } from 'native-base';

export interface HelpComponentProps {
}

export interface HelpComponentActions {
}

type AllProps = HelpComponentProps & HelpComponentActions;

export const HelpComponent: React.StatelessComponent<AllProps> =
    (_: AllProps): JSX.Element => {
        return <Text>Help</Text>;
    };
