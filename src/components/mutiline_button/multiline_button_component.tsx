import React from 'react';
import { TouchableOpacity } from 'react-native';
import { applicationStyles } from '../../application/styles';

export interface MultiLineButtonProps {
    readonly children: any; // tslint:disable-line:no-any
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
            { alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, flexWrap: 'wrap' },
        ]}>
        {props.children}
    </TouchableOpacity>
);