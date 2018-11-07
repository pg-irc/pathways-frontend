import React from 'react';
import * as R from 'ramda';
import { textStyles } from '../../application/styles';
import { Service, PhoneNumber, Address } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';

interface Props {
    readonly service: Service;
}

export function ServiceComponent(props: Props): JSX.Element {
    const mapWithIndex = R.addIndex(R.map);
    const physicalAddresses = R.filter(R.propEq('type', 'physical_address'), props.service.addresses);
    const capitalizeFirstLetter = (phoneType: string): string => (
        phoneType.charAt(0).toUpperCase() + phoneType.slice(1)
    );

    return (
        <View>
            <Text style={textStyles.headlineH3StyleBlackLeft}>
                {props.service.name}
            </Text>
            {
                mapWithIndex((address: Address, index: number) =>
                    <View key={index}>
                        <Text style={textStyles.headlineH4StyleBlackLeft}>{address.address}</Text>
                    </View>, physicalAddresses)
            }
            {
                mapWithIndex((phoneNumber: PhoneNumber, index: number) =>
                    <View key={index}>
                        <Text>
                            <Text style={textStyles.headlineH4StyleBlackLeft}>
                                {capitalizeFirstLetter(phoneNumber.type)}
                            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
                        </Text>
                    </View>, props.service.phoneNumbers)
            }
        </View>
    );
}