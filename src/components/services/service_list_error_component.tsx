import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View, Icon } from 'native-base';
import { ErrorSelectorTopicServices } from '../../selectors/services/types';
import { colors, textStyles } from '../../application/styles';
import { AsyncErrors } from '../../async/errors';

export interface ServiceListErrorComponentProps {
    readonly error: ErrorSelectorTopicServices;
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
                <Icon type={'MaterialCommunityIcons'} name={'alert-circle'} style={{ color: colors.sunYellow }} />
                <Text style={[textStyles.paragraphStyleBrown, { textAlign: 'center' }]}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const getTextForErrorType = (errorMessageType: AsyncErrors): JSX.Element => {
    if (errorMessageType === AsyncErrors.NoLocationPermission) {
        return (
            <Trans>
                Please ensure location services are enabled for Arrival Advisor.
            </Trans>
        );
    }
    if (errorMessageType === AsyncErrors.LocationFetchTimeout) {
        return (
            <Trans>
                Fetching your location timed out. On Android devices you may need to set
                your location mode to "High accuracy".
            </Trans>
        );
    }
    if (errorMessageType === AsyncErrors.BadServerResponse) {
        return (
            <Trans>
                Bad Server Response.
            </Trans>
        );
    }
    return <Trans>An error has occured.</Trans>;
};
