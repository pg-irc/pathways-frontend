import React from 'react';
import { View, Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export const IntroComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={{ marginVertical: 15 }}>
        <Text style={textStyles.headlineH1StyleBlackLeft}><Trans>My Plan</Trans></Text>
        <Text style={textStyles.headlineH4StyleBlackLeft}>
            <Trans>Keep track of everything I need to do to settle in Canada</Trans>
        </Text>
    </View>
);