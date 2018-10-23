import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export const IntroComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={{ marginBottom: 15 }}>
        <Text style={applicationStyles.title}>
            <Trans>Welcome!</Trans>
        </Text>
        <Text style={applicationStyles.p}>
            <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>Arrival Advisor </Text>
            <Trans>helps newcomers navigate life in Canada.</Trans>
        </Text>
    </View>
);
