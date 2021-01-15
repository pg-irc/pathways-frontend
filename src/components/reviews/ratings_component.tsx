import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { ChooseRatingAction } from '../../stores/reviews/actions';

export interface RatingsProps {
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export const RatingsComponent = (props: RatingsProps): JSX.Element => {
    const ratingCompleted = (rating: number): void => {
        // navigate to next screen
        // choose rating action
        console.log('Rating is: ' + rating)
    };
    return (
        <AirbnbRating
            count={5}
            defaultRating={props.rating}
            size={30}
            showRating={false}
            onFinishRating={ratingCompleted}
        />
    );
};