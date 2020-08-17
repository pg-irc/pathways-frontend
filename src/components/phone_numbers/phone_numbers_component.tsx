// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { PhoneNumber } from '../../validation/services/types';
import { CardButtonComponent } from '../card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link_component';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import * as R from 'ramda';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';
import { Trans } from '@lingui/react';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { extractCallablePhoneNumber } from './extract_callable_phone_number';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const PhoneNumbersComponent = (props: Props): JSX.Element => {
    if (R.isEmpty(props.phoneNumbers)) {
        return <MissingServiceDetailComponent title={<Trans>Phone</Trans>} />;
    }

    return (
        <View>
            {mapWithIndex(buildPhoneNumber(props), props.phoneNumbers)}
        </View>
    );
};

const buildPhoneNumber = R.curry((props: Props, phoneNumber: PhoneNumber, index: number): JSX.Element => {
    const callPhoneNumber = (): void => {
        const callableNumber = extractCallablePhoneNumber(phoneNumber.phone_number);
        const linkValue = callableNumber ? 'tel: ' + callableNumber : '';
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.phone, linkValue);
        openURL(linkValue);
    };
    const isFaxNumber = phoneNumber.type.toLowerCase().startsWith('fax');
    const phoneIcon = <ServiceDetailIconComponent name={'phone'} />;
    const shouldAddDivider = index !== 0;

    return (
        <View key={phoneNumber.phone_number}>
            {shouldAddDivider && <DividerComponent />}
            {isFaxNumber ?
            (NonClickableFaxNumbersComponent(renderSinglePhoneNumber(phoneNumber),<EmptyComponent/> )) :
            <CardButtonComponent
                leftContent={renderSinglePhoneNumber(phoneNumber)}
                rightContent={phoneIcon}
                onPress={callPhoneNumber}
            />
        }
        </View>
    );
});

const renderSinglePhoneNumber = (phoneNumber: PhoneNumber): JSX.Element => {
    const capitalizeFirstLetter = (s: string): string => (
        s.charAt(0).toUpperCase() + s.slice(1)
    );
    const fieldLabel = capitalizeFirstLetter(phoneNumber.type);
    return (
        <View style={{marginHorizontal: 5}}>
            <Text style={textStyles.paragraphBoldBlackLeft}>{fieldLabel}: </Text>
            <Text style={textStyles.paragraphStyle}>{phoneNumber.phone_number}</Text>
        </View>
    );
};

const NonClickableFaxNumbersComponent = (leftContent: JSX.Element, rightContent: JSX.Element): JSX.Element => {
    return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flex: 6 }}>
                <View style={{ flex: 5.5, alignItems: 'flex-start' }}>
                    {leftContent}
                </View>
                <View style={{ flex: .5, alignItems: 'flex-end', paddingRight: 10 }}>
                    {rightContent}
                </View>
            </View>
    );
};
