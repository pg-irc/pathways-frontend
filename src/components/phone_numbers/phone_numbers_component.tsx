// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { PhoneNumber } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import * as R from 'ramda';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { mapWithIndex } from '../../application/map_with_index';

interface Props {
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const PhoneNumbersComponent = (props: Props): JSX.Element => {
    return (
        <View>
            {mapWithIndex(buildPhoneNumber(props), props.phoneNumbers)}
        </View>
    );
};

const buildPhoneNumber = R.curry((props: Props, phoneNumber: PhoneNumber, index: number): JSX.Element => {
    const onPress = (): void => {
        const linkValue = 'tel: ' + phoneNumber.phone_number;
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.phone, linkValue);
        openURL(linkValue);
    };
    const shouldAddDivider = index !== 0;

    return (
        <View key={phoneNumber.phone_number}>
            {shouldAddDivider && <DividerComponent />}
            <CardButtonComponent
                leftContent={renderSinglePhoneNumber(phoneNumber)}
                rightContent={<ServiceDetailIconComponent name={'phone'} />}
                onPress={onPress}
            />
        </View>
    );
});

const renderSinglePhoneNumber = (phoneNumber: PhoneNumber): JSX.Element => {
    const capitalizeFirstLetter = (s: string): string => (
        s.charAt(0).toUpperCase() + s.slice(1)
    );
    const fieldLabel = capitalizeFirstLetter(phoneNumber.type);
    return (
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}>{fieldLabel}: </Text>
            <Text style={textStyles.paragraphStyle}>{phoneNumber.phone_number}</Text>
        </View>
    );
};