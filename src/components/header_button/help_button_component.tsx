import React from 'react';
import { History } from 'history';
import { Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { colors, values } from '../../application/styles';

export interface HelpButtonProps {
    readonly history: History;
}

export const HelpButtonComponent = (props: HelpButtonProps): JSX.Element => (
    <Button onPress={goToRouteWithoutParameter(Routes.Help, props.history)} transparent icon>
        <Icon
            type='FontAwesome'
            name='question-circle'
            style={{ color: colors.white, fontSize: values.mediumIconSize }}
        />
    </Button>
);
