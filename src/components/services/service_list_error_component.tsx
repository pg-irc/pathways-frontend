import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View, Icon } from 'native-base';
import { ErrorMessageType, TaskServicesError } from '../../stores/services';
import { colors, textStyles } from '../../application/styles';

export interface ServiceListErrorComponentProps {
    readonly error: TaskServicesError;
}

export const ServiceListErrorComponent = (props: ServiceListErrorComponentProps): JSX.Element => {
    const text = getTextForErrorType(props.error.errorMessageType);
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View
                style={{
                    padding: 10,
                    marginTop: 5,
                    alignItems: 'center',
                }}
            >
                <Icon type={'MaterialCommunityIcons'} name={'alert-circle'} style={{ color: colors.sunYellow }}/>
                <Text style={[textStyles.paragraphStyleBrown, { textAlign: 'center' }]}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const getTextForErrorType = (errorMessageType: ErrorMessageType): JSX.Element => {
    if (errorMessageType === ErrorMessageType.Location) {
        return <Trans>Please ensure location services are enabled for Arrival Advisor.</Trans>;
    }
    return <Trans>An error has occured.</Trans>;
};
