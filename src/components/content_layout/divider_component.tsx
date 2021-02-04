import React from 'react';
import { View } from 'react-native';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly isVisible?: boolean;
}

export const DividerComponent = ({ isVisible = true }: Props): JSX.Element => (
    isVisible ? <View style={{ height: 1, marginVertical: 15, marginHorizontal: -20, backgroundColor: colors.grey }}></View> : <EmptyComponent />
);
