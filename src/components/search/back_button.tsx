import React from 'react';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    readonly onPress: () => void;
}

export const BackButton = (props: Props): JSX.Element => (
    <TouchableOpacity onPress={props.onPress} style={{ padding: 15 }} >
        <Icon name={'arrow-back'} style={{}} />
    </TouchableOpacity >);
