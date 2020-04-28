import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface CheckBoxProps {
    readonly checked: boolean;
    readonly onPress: () => void;
    readonly iconStyle: ViewStyle;
}

export const CheckBox = ({ checked, onPress, iconStyle }: CheckBoxProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon
                name={ checked ? 'check-square-o' : 'checkbox-blank-outline'}
                style={iconStyle}
                type={ checked ? 'FontAwesome' : 'MaterialCommunityIcons' }
            />
        </TouchableOpacity>
    );
};
