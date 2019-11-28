import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';

export const DividerComponent = (): JSX.Element => (
    <View style={{ height: 2, marginVertical: 20, backgroundColor: colors.lightGrey }}></View>
);