import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import { isServiceDetailStringEmpty } from '../services/is_service_detail_empty';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';
import { DividerComponent } from '../content_layout/divider_component';

interface Props {
    readonly verificationDate: string;
}

export const ContentVerificationComponent = (props: Props): JSX.Element => {
    if (isServiceDetailStringEmpty(props.verificationDate)) {
        return <MissingServiceDetailComponent title={<Trans>Last verified</Trans>} />;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={[textStyles.paragraphBoldBlackLeft, { marginRight: 5 }]}>
                <Trans>Last verified</Trans>:
            </Text>
            <Text style={textStyles.paragraphStyle}>
                {props.verificationDate}
            </Text>
            <DividerComponent />
        </View>
    );
};
