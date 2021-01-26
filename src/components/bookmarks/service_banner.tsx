import React from 'react';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';

export const ServiceBanner = (): JSX.Element => (
    <View style={{ backgroundColor: colors.lightBlue, padding: 15 }}>
        <Text style={textStyles.headlineH3StyleBlackLeft}>
            <Trans>Your feedback helps newcomers.</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            <Trans>Tell us about your experience with a service you have used. Service providers use that feedback to improve.</Trans>
        </Text>
    </View>
);