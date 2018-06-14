import React from 'react';
import { Text } from 'native-base';

export interface ExploreSectionProps {
}

export interface ExploreSectionActions {
}

type AllExploreSectionProps = ExploreSectionProps & ExploreSectionActions;

export const ExploreSectionComponent: React.StatelessComponent<AllExploreSectionProps> =
    (_: AllExploreSectionProps): JSX.Element => {
        return <Text>ExploreSectionComponent</Text>;
    };
