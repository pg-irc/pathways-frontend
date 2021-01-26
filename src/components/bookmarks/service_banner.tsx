import React from 'react';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly isVisible: boolean;
}

export const ServiceBanner = (props: Props): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ backgroundColor: colors.lightBlue, padding: 15 }}>
            <Text style={textStyles.headlineH3StyleBrownLeft}>
                <Trans>Your feedback helps newcomers.</Trans>
            </Text>
            <Text style={textStyles.paragraphStyleBrown}>
                <Trans>Tell us about your experience with a service you have used. Service providers use that feedback to improve.</Trans>
            </Text>
        </View>
    );
};