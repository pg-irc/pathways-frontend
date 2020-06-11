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
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flex: 6 }}>
                <View style={{ flex: 5.5, alignItems: 'flex-start' }}>
                    {props.leftContent}
                </View>
                <View style={{ flex: .5, alignItems: 'flex-end', paddingRight: 10 }}>
                    {props.rightContent}
                </View>
            </View>
        </TouchableOpacity>
    );
};
