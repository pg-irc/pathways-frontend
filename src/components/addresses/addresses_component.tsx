import React from 'react';
import * as R from 'ramda';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { Icon } from 'native-base';
import { Address } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { colors, values, textStyles } from '../../application/styles';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { LatLong } from '../../validation/latlong/types';
import { openInMapsApplication } from '../maps_application_popup/open_in_maps_application';

interface Props {
    readonly addresses: ReadonlyArray<Address>;
    readonly latLong: LatLong;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly locationTitle: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const AddressesComponent = (props: Props): JSX.Element => (
    <View>
        {R.map(buildAddress(props), props.addresses)}
    </View>
);

const buildAddress = R.curry((props: Props, address: Address): JSX.Element => {
    const onPress = (): Promise<void> => {
        if (props.latLong) {
            const linkType = 'Button';
            const linkValue = 'Open in maps';
             // tslint:disable-next-line: no-expression-statement
            props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, linkType, linkValue);
            return openInMapsApplication(props.locationTitle, props.latLong);
        }
        return undefined;
    };

    return (
        <View key={address.id}>
            <CardButtonComponent
                leftContent={renderSingleAddress(address)}
                rightContent={renderIcon()}
                onPress={onPress}
            />
            <DividerComponent />
        </View>
    );
});

export const renderSingleAddress = (address: Address): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address</Trans>: </Text>
        <Text style={textStyles.paragraphStyle}>{address.address}</Text>
        <Text style={textStyles.paragraphStyle}>
            {address.city} {address.stateProvince} {address.postalCode}
        </Text>
    </View>
);

const renderIcon = (): JSX.Element => (
    <Icon
        name={'location-arrow'}
        type={'FontAwesome'}
        style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
    />
);