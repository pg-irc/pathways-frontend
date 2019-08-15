// tslint:disable:no-expression-statement
import React from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import * as IntentLauncher from 'expo-intent-launcher';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { textStyles } from '../../application/styles';

export const LocationSettingsButtonComponent = (): JSX.Element => (
    <MultiLineButtonComponent onPress={openLocationSettings} additionalStyles={{ flex: 0 }}>
        <Text style={textStyles.button}>
            <Trans>Go to Settings</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const openLocationSettings = (): void => {
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
};