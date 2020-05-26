import React from 'react';
import { Icon } from 'native-base';
import { colors } from '../application/styles';

export const LinkIcon = (): JSX.Element => (
    <Icon name='external-link' type='FontAwesome' style={{ fontSize: 12, color: colors.teal }} />
);
