import React from 'react';
import { Text, Alert, AlertButton, I18nManager } from 'react-native';
import Markdown, { openUrl } from 'react-native-markdown-renderer';
import { markdownStyles, alertStyles, textStyles } from '../../application/styles';
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

export const AlertMarkdownComponent = (props: Props): JSX.Element => (
    <Markdown
        rules={markdownRules}
        style={alertStyles}
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
        { text: _(alwaysOpenOption), onPress: (): void => openUrl(node.attributes.href) },
        { text: _(cancelOption), style: 'cancel' },
        { text: _(okOption), onPress: (): void => openUrl(node.attributes.href) },
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
                    <Text key={node.key} style={textStyles.link} onPress={(): void => linkAlertButton(node, i18nRenderProp.i18n)}>
                        {children}
                        <Text>{' '}</Text>
                        <LinkIcon />
                    </Text>)}
            </I18n>
        );
    },
};
