import React from 'react';
import { applicationStyles } from '../../application/styles';
import { Service } from '../../selectors/services';
import { View } from 'native-base';
import { Text } from 'react-native';

interface Props {
    readonly service: Service;
}

export function Service(props: Props): JSX.Element {
    return (
        <View>
            <Text style={applicationStyles.bold}>{props.service.name}</Text>
            <Text>{props.service.description}</Text>
        </View>
    );
}