import React from 'react';
import { View, Text } from 'react-native';
import { textStyles, colors } from '../../application/styles';
import { DividerComponent } from '../content_layout/divider_component';

interface Props {
    readonly title: JSX.Element;
}

export const MissingServiceDetailComponent = (props: Props): JSX.Element => {
    return (
        <View>
            <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.darkerGrey }]}>
                {props.title}
            </Text>
            <DividerComponent />
        </View>
    );
};
