import React from 'react';
import * as R from 'ramda';
import { applicationStyles, colors } from '../../application/styles';
import { Service } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { PhoneNumber } from '../../stores/services';
import { FullAddress } from '../../stores/services';
import { Trans } from '@lingui/react';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';

interface Props {
    readonly service: Service;
}

export function ServiceComponent(props: Props): JSX.Element {
    const mapWithIndex = R.addIndex(R.map);
    return (
        <View>
            <Text style={[
                applicationStyles.bold,
                { textAlign: 'left' },
            ]}>
                {props.service.name}
            </Text>
            {/* Address */}
            {
                mapWithIndex((fullAddress: FullAddress, index: number) =>
                <View key={index}>
                    <Text>
                        <Trans>{fullAddress.address.address}</Trans>
                    </Text>
                    
                </View>, R.dropLast(1 , props.service.fullAddresses))
            }
            {/* Contact */}
            {
                mapWithIndex((phoneNumber: PhoneNumber, index: number) =>
                    <View key={index}>
                        <Text>
                            <Text style={[{ color: colors.darkGrey }]}>
                                <Trans>{phoneNumber.type.charAt(0).toUpperCase() + phoneNumber.type.slice(1)}:</Trans>
                            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
                        </Text>
                            
                    </View>, props.service.phoneNumbers)
            }
        </View>
    );
}