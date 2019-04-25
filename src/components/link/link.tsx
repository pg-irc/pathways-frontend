// tslint:disable:no-expression-statement
import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { sendLinkPressedEvent } from '../../application/google_analytics';

type LinkProps = {
    readonly children: string;
    readonly href: string;
    readonly style?: object;
    readonly onPress?: () => void;
};

export const openURL = (url: string): void => {
  Linking.canOpenURL(url).then((supported: boolean) => {
    if (supported) {
      Linking.openURL(url).catch((error: string) => console.error(error));
    } else {
      console.log('Can\'t handle url: ' + url);
    }
  }).catch((error: string) => console.error(error));
};

export const openURLWithAnalytics = (url: string, currentPath: string, linkValue: string): void => {
    sendLinkPressedEvent(currentPath, linkValue);
    openURL(url);
};

export const Link = (props: LinkProps): JSX.Element => {
    const onPress = props.onPress ? props.onPress : (): void => openURL(props.href);
    return (
        <Text onPress={onPress} style={[ textStyles.paragraphURL, props.style ]}>
            {props.children}
        </Text>
    );
};
