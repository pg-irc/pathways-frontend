import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import { RatingsComponent } from './ratings_component';

export const ReviewThisServiceRatingsComponent = (): JSX.Element => (
    <View>
        <Text style={textStyles.headlineH3StyleBlackCenter}>
                <Trans>Review this service</Trans>
            </Text>
        <RatingsComponent />
    </View>
);