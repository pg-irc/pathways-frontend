import React from 'react';
import { Text } from 'react-native';
import { Linking } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { markdownStyles } from '../../application/styles';
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
                    {({ i18n }: { readonly i18n: I18n }): JSX.Element => (
                        <Text onPress={(): void => alertOnLinkClicked(node, i18n, props.hideLinkAlerts)}>
                            {children}
                            <Text>{' '}</Text>
                            <LinkIcon />
                        </Text>)}
                </I18n>
            );
        },
    };
    const getMarkdownRules = (props: Props) => {
        if (props.showLinkAlerts) {
            return markdownAlertRules;
        }
        return markdownRules;
    };

    return (
        <Markdown
            rules={getMarkdownRules(props)}
            style={markdownStyles}
        >
            {props.children}
        </Markdown>
    );
};
