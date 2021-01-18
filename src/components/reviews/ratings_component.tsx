// tslint:disable: no-expression-statement
import React from 'react';
import { View } from 'react-native';
export interface RatingsProps {
    readonly rating: number;
    readonly onFinishRating: (rating: number) => void;
}

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <View>Smiley face ratings here {props.rating}</View>
);