import React from 'react';
import { View } from 'react-native';
import { ConnectedLanguageSwitcher } from './connected_language_switcher';

export const DrawerContainer = (): JSX.Element => (
    <View style={{ backgroundColor: '#FFF', height: '100%' }}>
        <ConnectedLanguageSwitcher />
    </View>
);