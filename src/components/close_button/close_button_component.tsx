import React from 'react';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface CloseButtonActions {
    readonly onPress: () => void;
}

interface CloseButtonProps {
    readonly color: string;
    readonly additionalStyle?: object;
}

type Props = CloseButtonActions & CloseButtonProps;

export const CloseButtonComponent = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onPress}
        style={
            {
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                maxHeight: 50,
                paddingTop: 25,
                paddingRight: 15,
                ...props.additionalStyle,
            }
        }
    >
        <Icon name='window-close' type={'MaterialCommunityIcons'} style={{ color: props.color, fontSize: 25 }} />
    </TouchableOpacity>
);
