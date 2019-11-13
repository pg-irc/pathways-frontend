import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';

export const ContentDividerComponent = (): JSX.Element => (
    <View style={{ height: 2, flex: 1, marginVertical: 20, backgroundColor: colors.lightGrey }}></View>
);