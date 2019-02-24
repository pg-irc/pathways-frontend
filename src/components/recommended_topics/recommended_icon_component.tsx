import React from 'react';
import { Icon } from 'native-base';
import { colors, values } from '../../application/styles';

export interface RecommendedIconComponentProps {
    readonly additionalStyles?: object;
}

export const RecommendedIconComponent = (props: RecommendedIconComponentProps): JSX.Element => (
    <Icon
        style={
            {
                fontSize: values.smallerIconSize,
                color: colors.lightTeal,
                ...props.additionalStyles,
            }
        }
        name={'check-decagram'}
        type={'MaterialCommunityIcons'}
    />
);