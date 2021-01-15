import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { chooseRating, ChooseRatingAction } from '../../stores/reviews/actions';

export interface RatingsProps {
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export const RatingsComponent = (props: RatingsProps): JSX.Element => {
    const onFinishRating = (rating: number): void => {
        // tslint:disable-next-line: no-expression-statement
        chooseRating(rating);

    };
    return (
        <AirbnbRating
            count={5}
            defaultRating={props.rating}
            size={30}
            showRating={false}
            onFinishRating={onFinishRating}
        />
    );
};