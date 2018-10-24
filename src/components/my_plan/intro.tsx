import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export const IntroComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={{ marginBottom: 15 }}>
        <Text style={applicationStyles.title}><Trans>My Plan</Trans></Text>
        <Text style={applicationStyles.p}>
            <Trans>Keep track of everything I need to do to settle in Canada</Trans>
        </Text>
    </View>
);