import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import { AirbnbRating } from 'react-native-ratings';

export const RatingsComponent = (): JSX.Element => {
    const ratingCompleted = (rating: number): void => {
        // navigate to next screen
        // choose rating action
        console.log('Rating is: ' + rating)
    };
    return (
        <View>
            <Text style={textStyles.headlineH3StyleBlackCenter}>
                <Trans>Review this service</Trans>
            </Text>
            <AirbnbRating
                count={5}
                defaultRating={0}
                size={30}
                showRating={false}
                onFinishRating={ratingCompleted}
            />
        </View>
    );
};

