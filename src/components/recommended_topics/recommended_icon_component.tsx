import React from 'react';
import { Icon } from 'native-base';

import { callToActionStyles } from './styles';

export interface RecommendedIconComponentProps {
    readonly additionalStyles?: object;
}

export const RecommendedIconComponent = (props: RecommendedIconComponentProps): JSX.Element => (
    <Icon
        style={[callToActionStyles.recommendationIcon, props.additionalStyles]}
        name='check-decagram'
        type='MaterialCommunityIcons'
    />
);