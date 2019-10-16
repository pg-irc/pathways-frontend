import React from 'react';
import { Trans } from '@lingui/react';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';

export const topicAddedNotification = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            <Trans>Bookmark added</Trans>
        </Text>
    );
};

export const topicRemovedNotification = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            <Trans>Bookmark removed</Trans>
        </Text>
    );
};
