import React from 'react';
import { Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';

export interface ExploreSectionProps {
    readonly section: ExploreSection;
}

export interface ExploreSectionActions {
}

type AllExploreSectionProps = ExploreSectionProps & ExploreSectionActions;

export const ExploreSectionComponent: React.StatelessComponent<AllExploreSectionProps> =
    (_: AllExploreSectionProps): JSX.Element => {
        return <Text>ExploreSectionComponent</Text>;
    };
