import React from 'react';
import * as R from 'ramda';
import { applicationStyles, colors } from '../../application/styles';
import { Service } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { PhoneNumber } from '../../stores/services';
import { Trans } from '@lingui/react';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';

interface Props {
    readonly service: Service;
}

export function ServiceComponent(props: Props): JSX.Element {
    const mapWithIndex = R.addIndex(R.map);

    
    const fullAddress = props.service.fullAddresses;
    
    let mainAddress = "";
    if (fullAddress != null ) {
        const phyAddress = fullAddress.address;
        if (phyAddress != null) {
            mainAddress = phyAddress.address;
        }
    }
      
    return (
        <View>
            <Text style={[
                applicationStyles.bold,
                { textAlign: 'left' },
            ]}>
                {props.service.name}
            </Text>
            <View>
                <Text>
                    <Trans>{mainAddress}</Trans>
                </Text>
            </View>
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