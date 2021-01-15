import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';

export const RatingsComponent = (): JSX.Element => {
    return (
        <View>
            <Text style={textStyles.headlineH3StyleBlackCenter}>
                <Trans>Review this service</Trans>
            </Text>
        </View>
    );
};