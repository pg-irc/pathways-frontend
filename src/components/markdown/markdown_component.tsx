import React from 'react';
import { Text } from 'react-native';
import { Linking } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { markdownStyles } from '../../application/styles';
import { ReactI18nRenderProp } from '../../locale/types';
import { I18n } from '@lingui/react';
import { LinkIcon } from '../link/link_icon_component';
import { alertOnLinkClicked } from '../link/link_component';

interface Props {
    readonly children: string;
    readonly showLinkAlerts: boolean;
    readonly hideLinkAlerts: () => void;
}

export const MarkdownComponent = (props: Props): JSX.Element => {
    const markdownRules = {
        // tslint:disable-next-line:no-any
        link: (node: any, children: any): JSX.Element => {
            return (
                <Text key={node.key} onPress={(): Promise<void> => Linking.openURL(node.attributes.href)}>
                    {children}
                    <Text>{' '}</Text>
                    <LinkIcon />
                </Text>
            );
        },
    };
    const markdownAlertRules = {
        // tslint:disable-next-line:no-any
        link: (node: any, children: any): JSX.Element => {
            return (
                <I18n key={node.key}>
                    {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                        <Text onPress={(): void => alertOnLinkClicked(node, i18nRenderProp.i18n, props.hideLinkAlerts)}>
                            {children}
                            <Text>{' '}</Text>
                            <LinkIcon />
                        </Text>)}
                </I18n>
            );
        },
    };
    if (props.showLinkAlerts) {
        return (
            <Markdown
                rules={markdownAlertRules}
                style={markdownStyles}
            >
                {props.children}
            </Markdown>
        );
    }

    return (
        <Markdown
            rules={markdownRules}
            style={markdownStyles}
        >
            {props.children}
        </Markdown>
    );
};
