import React from 'react';
import { TouchableOpacity } from 'react-native';
import { applicationStyles } from '../../application/styles';

export interface MultiLineButtonProps {
    readonly children: any; // tslint:disable-line:no-any
    readonly additionalStyles?: object;
}

export interface MultiLineButtonActions {
    readonly onPress: () => void;
}

type Props = MultiLineButtonProps & MultiLineButtonActions;

export const MultiLineButtonComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onPress}
        style={[
            applicationStyles.tealButton,
            applicationStyles.boxShadowBelow,
            {
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
            },
            props.additionalStyles,
        ]}>
        {props.children}
    </TouchableOpacity>
);