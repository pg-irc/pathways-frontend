// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { PhoneNumber } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles, colors, values } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import * as R from 'ramda';

interface Props {
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const PhoneNumbersComponent = (props: Props): JSX.Element => {
    return (
        <View>
            {R.map(buildPhoneNumber(props), props.phoneNumbers)}
        </View>
    );
};

const buildPhoneNumber = R.curry((props: Props, phoneNumber: PhoneNumber): JSX.Element => {
    const onPress = (): void => {
        const linkValue = 'tel: ' + phoneNumber.phone_number;
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.phone, linkValue);
        openURL(linkValue);
    };
    return (
        <View key={phoneNumber.phone_number}>
            <CardButtonComponent
                leftContent={renderSinglePhoneNumber(phoneNumber)}
                rightContent={renderIcon()}
                onPress={onPress}
            />
            <DividerComponent />
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

const renderIcon = (): JSX.Element => (
    <Icon
        name={'phone'}
        type={'FontAwesome'}
        style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
    />
);