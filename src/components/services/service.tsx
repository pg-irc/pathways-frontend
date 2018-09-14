import React from 'react';
import * as R from 'ramda';
import { applicationStyles } from '../../application/styles';
import { Service } from '../../stores/services'
import { View } from 'native-base';
import { Text } from 'react-native';
import { PhoneNumber } from '../../stores/services/types';

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
            {
                mapWithIndex((phoneNumber: PhoneNumber, index: number) =>
                    <View key={index}>
                        <Text>{phoneNumber.type}</Text>
                        <Text>{phoneNumber.phoneNumber}</Text>
                    </View>, props.service.phoneNumbers)
            }
        </View>
    );
}