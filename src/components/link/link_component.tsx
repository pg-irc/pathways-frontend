// tslint:disable:no-expression-statement
import React from 'react';
import { Linking, Alert, I18nManager, AlertButton } from 'react-native';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { LinkIcon } from './link_icon_component';
import { t } from '@lingui/macro';
import * as R from 'ramda';
import { isAndroid } from '../../application/helpers/is_android';

interface LinkProps {
    readonly children: string;
    readonly href: string;
    readonly style?: object;
}

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
    return (
        <Text onPress={onPress} style={[textStyles.paragraphURL, props.style]}>
            {props.children}
            <LinkIcon />
        </Text>
    );
};

export const LinkTypes = {
    email: 'Email',
    website: 'Website',
    phone: 'Phone',
};

// tslint:disable-next-line: no-any
export const alertOnLinkClicked = (node: any, i18n: I18n, hideLinkAlerts: () => void): void => {
    const heading = t`Opening External Link`;
    const message = t`This link will open in your device's browser.`;
    const okOption = t`OK`;
    const cancelOption = t`Cancel`;
    const dontShowOption = t`Don't show again`;
    // tslint:disable-next-line: readonly-array
    const buttons: AlertButton[] = [
        {
            text: i18n._(dontShowOption), onPress: (): Promise<void> => {
                // tslint:disable-next-line: no-expression-statement
                hideLinkAlerts();
                return Linking.openURL(node.attributes.href);
            },
        },
        { text: i18n._(cancelOption), style: 'cancel' },
        { text: i18n._(okOption), onPress: (): Promise<void> => Linking.openURL(node.attributes.href) },
    ];
    // buttons are arranged horizontally on Android and vertically on iPhone, so reverse the buttons on Android only
    const reverseButtons = I18nManager.isRTL && isAndroid();
    // tslint:disable-next-line: no-expression-statement
    Alert.alert(i18n._(heading), i18n._(message),
        reverseButtons ? R.reverse(buttons) : buttons,
    );
};
