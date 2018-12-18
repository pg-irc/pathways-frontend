import React from 'react';
import { Trans } from '@lingui/react';
import { Text } from 'native-base';
import { textStyles } from '../../application/styles';

export const taskAddedNotification = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            <Trans>Bookmark added</Trans>
        </Text>
    );
};
