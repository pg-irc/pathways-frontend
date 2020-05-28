import React from 'react';
import { Text, Alert, AlertButton, I18nManager } from 'react-native';
import { Linking } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { markdownStyles } from '../../application/styles';
import { ReactI18n, ReactI18nRenderProp } from '../../locale/types';
import * as R from 'ramda';
import { I18n } from '@lingui/react';
import { LinkIcon } from '../link_icon_component';

interface Props {
    readonly children: string;
}

export const MarkdownComponent = (props: Props): JSX.Element => (
    <Markdown
        rules={markdownRules}
        style={markdownStyles}
    >
        {props.children}
    </Markdown>
);

// tslint:disable-next-line: no-any
const linkAlertButton = (node: any, i18n: ReactI18n): void => {
    const _ = i18n._.bind(i18n);
    const heading = 'Opening External Links';
    const message = 'By clicking on the link, you will be redirected to an external browser on your device.';
    const okOption = 'OK';
    const cancelOption = 'Cancel';
    const alwaysOpenOption = 'Always Open';
    // tslint:disable-next-line: readonly-array
    const buttons: AlertButton[] = [
        { text: _(alwaysOpenOption), onPress: (): Promise<void> => Linking.openURL(node.attributes.href) },
        { text: _(cancelOption), style: 'cancel' },
        { text: _(okOption), onPress: (): Promise<void> => Linking.openURL(node.attributes.href) },
    ];
    // tslint:disable-next-line: no-expression-statement
    Alert.alert(_(heading), _(message),
        I18nManager.isRTL ? R.reverse(buttons) : buttons,
    );
};

const markdownRules = {
    // tslint:disable-next-line:no-any
    link: (node: any, children: any): JSX.Element => {
        return (
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <Text key={node.key} onPress={(): void => linkAlertButton(node, i18nRenderProp.i18n)}>
                        {children}
                        <Text>{' '}</Text>
                        <LinkIcon />
                    </Text>)}
            </I18n>
        );
    },
};
