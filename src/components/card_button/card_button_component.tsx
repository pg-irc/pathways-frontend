import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly textLabel: JSX.Element;
    readonly text: string;
    readonly onPress: () => void;
    readonly icon?: string;
}

export const CardButtonComponent = (props: Props): JSX.Element => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={textStyles.paragraphBoldBlackLeft}>
                        {props.textLabel}:
                    </Text>
                    <Text style={textStyles.paragraphStyle}>
                        {props.text}
                    </Text>
                </View>
                <IconComponent icon={props.icon} />
            </View>
        </TouchableOpacity>
    );
};

const IconComponent = (props: { readonly icon?: string }): JSX.Element => (
    props.icon ?
        <Icon name={props.icon} type={'FontAwesome'} style={{ color: colors.teal, fontSize: values.smallIconSize }}/>
        :
        <EmptyComponent />
);
