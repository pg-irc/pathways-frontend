import React from 'react';
import { Text } from 'native-base';
import { AnalyticsLink } from './link';
import { phoneNumberRegex } from '../../application/regular_expressions';
import { mapWithIndex } from '../../application/map_with_index';

export interface TextWithPhoneLinksProps {
    readonly text: string;
    readonly currentPath: string;
    readonly linkContext: string;
    readonly linkType: string;
}

export const TextWithPhoneLinks: React.StatelessComponent<TextWithPhoneLinksProps> = (props: TextWithPhoneLinksProps): JSX.Element => {
    const words = props.text.split(' ');
    const lastIndex = words.length - 1;
    return (
        <Text>
            {
                mapWithIndex((word: string, currentIndex: number): string | JSX.Element => {
                    const wordForSentence = currentIndex === lastIndex ? word : word + ' ';
                    if (phoneNumberRegex.test(word)) {
                        return (
                            <AnalyticsLink
                                key={currentIndex}
                                href={`tel: ${word}`}
                                currentPath={props.currentPath}
                                linkContext={props.linkContext}
                                linkType={props.linkType}
                            >
                                {wordForSentence}
                            </AnalyticsLink>
                        );
                    }
                    return wordForSentence;
                }, words)
            }
        </Text>
    );
};
