import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { textStyles, colors, values } from '../../application/styles';

interface Props {
    readonly textLabel: JSX.Element;
    readonly text: string;
    readonly icon: string;
}

export const IconRowComponent = (props: Props): JSX.Element => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    {props.textLabel}:
                </Text>
                <Text style={textStyles.paragraphStyle}>
                    {props.text}
                </Text>
            </View>
            <Icon name={props.icon} type={'FontAwesome'} style={{ color: colors.teal, fontSize: values.smallIconSize }}/>
        </View>
    );
};
