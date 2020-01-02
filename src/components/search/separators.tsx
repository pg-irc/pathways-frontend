import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';

export const SearchListSeparator = (): JSX.Element => (
    <View style={{ borderBottomWidth: 8, borderColor: colors.lightGrey }} />
);
