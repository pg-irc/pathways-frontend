import React from 'react';
import { View, Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export const IntroComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={{ marginVertical: 15 }}>
        <Text style={textStyles.headlineH1StyleBlackLeft}>
            <Trans>Welcome!</Trans>
        </Text>
        <Text style={textStyles.headlineH4StyleBlackLeft}>
            <Text style={textStyles.headlineH3StyleBlackLeft}>Arrival Advisor </Text>
            <Trans>helps newcomers navigate life in Canada.</Trans>
        </Text>
    </View>
);
