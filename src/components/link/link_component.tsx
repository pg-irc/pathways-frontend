// tslint:disable:no-expression-statement
import React from 'react';
import { Linking, Alert, I18nManager, AlertButton } from 'react-native';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { LinkIcon } from './link_icon_component';
import { ReactI18n } from '../../locale/types';
import * as R from 'ramda';

interface LinkProps {
    readonly children: string;
    readonly href: string;
    readonly style?: object;
}

const renderLink = (onPress: () => void, style: object, text: string): JSX.Element => (
    <Text onPress={onPress} style={[textStyles.paragraphURL, style]}>
        {text}
        <LinkIcon />
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

export const LinkTypes = {
    email: 'Email',
    website: 'Website',
    phone: 'Phone',
};

// tslint:disable-next-line: no-any
export const alertOnLinkClicked = (node: any, i18n: ReactI18n, hideLinkAlerts: () => void): void => {
    const _ = i18n._.bind(i18n);
    const heading = 'Opening External Links';
    const message = 'By clicking on the link, you will be redirected to an external browser on your device.';
    const okOption = 'OK';
    const cancelOption = 'Cancel';
    const alwaysOpenOption = 'Always Open';
    // tslint:disable-next-line: readonly-array
    const buttons: AlertButton[] = [
        {
            text: _(alwaysOpenOption), onPress: (): Promise<void> => {
                // tslint:disable-next-line: no-expression-statement
                hideLinkAlerts();
                return Linking.openURL(node.attributes.href);
            },
        },
        { text: _(cancelOption), style: 'cancel' },
        { text: _(okOption), onPress: (): Promise<void> => Linking.openURL(node.attributes.href) },
    ];
    // tslint:disable-next-line: no-expression-statement
    Alert.alert(_(heading), _(message),
        I18nManager.isRTL ? R.reverse(buttons) : buttons,
    );
};
