import React from 'react';
import { Icon } from 'native-base';
import { TouchableOpacity, I18nManager } from 'react-native';

interface Props {
    readonly onPress: () => void;
}

export const BackButton = (props: Props): JSX.Element => (
    <TouchableOpacity onPress={props.onPress} style={{ padding: 15 }} >
        <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} style={{}} />
    </TouchableOpacity >);
