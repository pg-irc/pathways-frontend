import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface Props {
    readonly leftContent: JSX.Element;
    readonly rightContent: JSX.Element;
    readonly onPress: () => void;
}

export const CardButtonComponent = (props: Props): JSX.Element => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    {props.leftContent}
                </View>
                <View>
                    {props.rightContent}
                </View>
            </View>
        </TouchableOpacity>
    );
};
