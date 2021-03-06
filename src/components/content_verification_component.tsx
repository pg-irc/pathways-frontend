import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../application/styles';
import { isServiceDetailStringEmpty } from './services/is_service_detail_empty';
import { MissingServiceDetailComponent } from './services/missing_service_detail_component';

interface Props {
    readonly verificationDate: string;
}

export const ContentVerificationComponent = (props: Props): JSX.Element => {
    if (isServiceDetailStringEmpty(props.verificationDate)) {
        return <MissingServiceDetailComponent title={<Trans>Last verified:</Trans>} />;
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
            <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
                <Trans>Last verified:</Trans>
            </Text>
            <Text style={textStyles.paragraphStyle}>
                {props.verificationDate}
            </Text>
        </View>
    );
};
