import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export interface CardButtonProps {
    readonly leftContent: JSX.Element;
    readonly rightContent: JSX.Element;
    readonly onPress: () => void;
}

export const CardButtonComponent = (props: CardButtonProps): JSX.Element => {
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
