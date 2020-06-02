import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';

export const DividerComponent = (): JSX.Element => (
    <View style={{ height: 1, marginVertical: 10, marginHorizontal: -20, backgroundColor: colors.grey }}></View>
);
