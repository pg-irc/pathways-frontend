import React from 'react';
import { AirbnbRating } from 'react-native-ratings';

export const RatingsComponent = (): JSX.Element => {
    const ratingCompleted = (rating: number): void => {
        // navigate to next screen
        // choose rating action
        console.log('Rating is: ' + rating)
    };
    return (
        <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            showRating={false}
            onFinishRating={ratingCompleted}
        />
    );
};