// tslint:disable:no-expression-statement
import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { sendLinkPressedEvent } from '../../application/google_analytics';

interface LinkProps {
    readonly children: string;
    readonly href: string;
    readonly style?: object;
}

interface AnalyticsLinkProps {
    readonly children: string;
    readonly href: string;
    readonly currentPath: string;
    readonly linkContext: string;
    readonly linkType: string;
    readonly style?: object;
}

const renderLink = (onPress: () => void, style: object, text: string): JSX.Element => (
    <Text onPress={onPress} style={[textStyles.paragraphURL, style]}>
        {text}
    </Text>
);

export const openURL = (url: string): void => {
    Linking.canOpenURL(url).then((supported: boolean) => {
        if (supported) {
            Linking.openURL(url).catch((error: string) => console.error(error));
        } else {
            console.log('Can\'t handle url: ' + url);
        }
    }).catch((error: string) => console.error(error));
};

export const Link = (props: LinkProps): JSX.Element => {
    const onPress = (): void => openURL(props.href);
    return renderLink(onPress, props.style, props.children);
};

export const AnalyticsLink = (props: AnalyticsLinkProps): JSX.Element => {
    const onPress = (): void => {
        sendLinkPressedEvent(props.currentPath, props.linkContext, props.linkType, props.href);
        openURL(props.href);
    };
    return renderLink(onPress, props.style, props.children);
};
