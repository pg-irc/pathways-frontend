import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';

interface Props {
    readonly verificationDate: string;
}

export const ContentVerificationComponent = (props: Props): JSX.Element => (
    <View style={{ flexDirection: 'row' }}>
        <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
            <Trans>Last verified</Trans>:
        </Text>
        <Text style={textStyles.paragraphStyle}>
            {props.verificationDate}
        </Text>
    </View>
);