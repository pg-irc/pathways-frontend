import React from 'react';
import * as R from 'ramda';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { Address } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles } from '../../application/styles';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { LatLong } from '../../validation/latlong/types';
import { openInMapsApplication } from '../maps_application_popup/open_in_maps_application';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';
import { mapWithIndex } from '../../application/helpers/map_with_index';

interface Props {
    readonly addresses: ReadonlyArray<Address>;
    readonly latLong: LatLong;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly locationTitle: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const AddressesComponent = (props: Props): JSX.Element => {
    if (R.isEmpty(props.addresses)) {
        return <MissingServiceDetailComponent title={<Trans>Address:</Trans>} />;
    }
    return (
    <View>
        {mapWithIndex(buildAddress(props), props.addresses)}
    </View>
    );
};

const buildAddress = R.curry((props: Props, address: Address, index: number): JSX.Element => {
    const onPress = (): Promise<void | string> => {
        if (props.latLong) {
            const linkType = 'Button';
            const linkValue = 'Open in maps';
             // tslint:disable-next-line: no-expression-statement
            props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, linkType, linkValue);
            return openInMapsApplication(props.locationTitle, props.latLong);
        }
        return undefined;
    };
    const shouldAddDivider = index !== 0;

    return (
        <View key={address.id}>
            {shouldAddDivider && <DividerComponent />}
            <CardButtonComponent
                leftContent={renderSingleAddress(address)}
                rightContent={<ServiceDetailIconComponent name={'location-arrow'} />}
                onPress={onPress}
            />
        </View>
    );
});

export const renderSingleAddress = (address: Address): JSX.Element => (
    <View style={{marginHorizontal: 5}}>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address:</Trans> </Text>
        <Text style={textStyles.paragraphStyle}>{address.address}</Text>
        <Text style={textStyles.paragraphStyle}>
            {address.city} {address.stateProvince} {address.postalCode}
        </Text>
    </View>
);
