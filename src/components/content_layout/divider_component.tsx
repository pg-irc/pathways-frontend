import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';

export const DividerComponent = (): JSX.Element => (
    <View style={{ height: 1, marginVertical: 20, marginHorizontal: -10, backgroundColor: colors.grey }}></View>
);