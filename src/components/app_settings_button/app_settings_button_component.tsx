// tslint:disable:no-expression-statement
import React from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import * as IntentLauncher from 'expo-intent-launcher';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { textStyles } from '../../application/styles';
import { openURL } from '../link/link';

export enum SettingsType {
    AndroidAppLocation,
    AndroidAppSettings,
    IOSAppSettings,
}

interface Props {
    readonly settingsType: SettingsType;
}

export const AppSettingsButtonComponent = (props: Props): JSX.Element => (
    <MultiLineButtonComponent onPress={openSettings(props.settingsType)} additionalStyles={{ flex: 0 }}>
        <Text style={textStyles.button}>
            <Trans>Go to Settings</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const openSettings = (settingsType: SettingsType): () => void | undefined => {
    switch (settingsType) {
        case SettingsType.AndroidAppLocation:
            return (): void => {
                IntentLauncher.startActivityAsync(
                    IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS,
                );
            };
        case SettingsType.AndroidAppSettings:
            return (): void => {
                IntentLauncher.startActivityAsync(
                    IntentLauncher.ACTION_APPLICATION_SETTINGS,
                );
            };
        case SettingsType.IOSAppSettings:
            return (): void => openURL('app-settings:');
        default:
            return undefined;
    }
};