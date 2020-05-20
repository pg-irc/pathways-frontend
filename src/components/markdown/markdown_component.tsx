import React from 'react';
import { Text } from 'react-native';
import { Icon } from 'native-base';
import Markdown, { openUrl } from 'react-native-markdown-renderer';
import { colors, markdownStyles, alertStyles } from '../../application/styles';

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

const markdownRules = {
    // tslint:disable-next-line:no-any
    link: (node: any, children: any): JSX.Element => {
        return (
            <Text key={node.key} style={markdownStyles.link} onPress={(): void => openUrl(node.attributes.href)}>
                {children}
                <Text>{' '}</Text>
                <Icon name='external-link' type='FontAwesome' style={{ fontSize: 12, color: colors.teal }} />
            </Text>
        );
    },
};
