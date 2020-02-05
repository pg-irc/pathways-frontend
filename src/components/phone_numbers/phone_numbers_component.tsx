// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { mapWithIndex } from '../../application/map_with_index';
import { PhoneNumber } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles, colors, values } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';

interface Props {
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const PhoneNumbersComponent = (props: Props): JSX.Element => {
    return (
        <View>
            {mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element =>
                <PhoneNumberCardComponent {...props} phoneNumber={phoneNumber} index={index} />
            , props.phoneNumbers)}
        </View>
    );
};

export interface PhoneNumberCardComponentProps {
    readonly index: number;
    readonly phoneNumber: PhoneNumber;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

const PhoneNumberCardComponent = (props: PhoneNumberCardComponentProps): JSX.Element => {
    const onPress = (): void => {
        const linkValue = 'tel: ' + props.phoneNumber.phone_number;
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.phone, linkValue);
        openURL(linkValue);
    };
    return (
        <View key={props.index}>
            <CardButtonComponent
                leftContent={renderPhoneNumber(props.phoneNumber)}
                rightContent={renderIcon()}
                onPress={onPress}
            />
            <DividerComponent />
        </View>
    );
};

const renderPhoneNumber = (phoneNumber: PhoneNumber): JSX.Element => {
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