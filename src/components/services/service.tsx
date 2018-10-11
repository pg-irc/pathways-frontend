import React from 'react';
import * as R from 'ramda';
import { applicationStyles, colors } from '../../application/styles';
import { Service, Address } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { PhoneNumber } from '../../stores/services';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';

interface Props {
    readonly service: Service;
}

export function ServiceComponent(props: Props): JSX.Element {
    const mapWithIndex = R.addIndex(R.map);

    
    const capitalizeFirstLetter = (phoneType: String): string => (
        `${phoneType.charAt(0).toUpperCase()}${phoneType.slice(1)}`
    );

    const getAddress = (address: Address): string => (
        `${address===null? '': address.address}`
    );
      
    return (
        <View>
            <Text style={[
                applicationStyles.bold,
                { textAlign: 'left' },
            ]}>
                {props.service.name}
            </Text>
            {/* <Text>{address}</Text> */}
            <Text>{getAddress(props.service.physicalAddress)}</Text>
            {/* Contact */}
            {
                mapWithIndex((phoneNumber: PhoneNumber, index: number) =>
                    <View key={index}>
                        <Text>
                            <Text style={[{ color: colors.darkGrey }]}>
                                {capitalizeFirstLetter(phoneNumber.type)}
                            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
                        </Text>
                            
                    </View>, props.service.phoneNumbers)
            }
        </View>
    );
}