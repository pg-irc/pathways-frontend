import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import { RatingsComponent } from './ratings_component';
import { ChooseRatingAction } from '../../stores/reviews/actions';

interface Props {
    readonly rating: number;
    readonly chooseRating: (rating: number) => ChooseRatingAction;
}

export const ServiceDetailRatingsComponent = (props: Props): JSX.Element => (
    <View>
        <Text style={textStyles.headlineH3StyleBlackCenter}>
                <Trans>Review this service</Trans>
            </Text>
        <RatingsComponent {...props}/>
    </View>
);