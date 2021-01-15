// tslint:disable: no-expression-statement
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
export interface RatingsProps {
    readonly rating: number;
    readonly onFinishRating: (rating: number) => void;
}

export const RatingsComponent = (props: RatingsProps): JSX.Element => (
    <AirbnbRating
        count={5}
        defaultRating={props.rating}
        size={30}
        showRating={false}
        onFinishRating={props.onFinishRating}
    />
);