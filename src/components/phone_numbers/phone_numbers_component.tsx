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
import { sendLinkPressedEvent } from '../../sagas/analytics/events';

interface Props {
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
}

export const PhoneNumbersComponent = (props: Props): JSX.Element => {
    return (
        <View>
            {mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element =>
                <View key={index}>
                    <CardButtonComponent
                        leftContent={
                            <SinglePhoneNumberComponent
                                phoneNumber={phoneNumber}
                            />
                        }
                        rightContent={
                            <Icon
                                name={'phone'}
                                type={'FontAwesome'}
                                style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
                            />
                        }
                        onPress={
                            getOnPressForPhoneNumber(phoneNumber, props.currentPathForAnalytics, props.linkContextForAnalytics)
                        }
                    />
                    <DividerComponent />
                </View>
            , props.phoneNumbers)}
        </View>
    );
};

interface SinglePhoneNumberProps {
    readonly phoneNumber: PhoneNumber;
}

const SinglePhoneNumberComponent = (props: SinglePhoneNumberProps): JSX.Element => {
    const capitalizeFirstLetter = (s: string): string => (
        s.charAt(0).toUpperCase() + s.slice(1)
    );
    const fieldLabel = capitalizeFirstLetter(props.phoneNumber.type);
    return (
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}>{fieldLabel}: </Text>
            <Text style={textStyles.paragraphStyle}>{props.phoneNumber.phone_number}</Text>
        </View>
    );
};

const getOnPressForPhoneNumber = (phoneNumber: PhoneNumber, currentPathForAnalytics: string, linkContextForAnalytics: string): () => void => {
    const linkValue = 'tel: ' + phoneNumber.phone_number;
    const onPress = (): void => {
        sendLinkPressedEvent(currentPathForAnalytics, linkContextForAnalytics, LinkTypes.phone, linkValue);
        openURL(linkValue);
    };
    return onPress;
}