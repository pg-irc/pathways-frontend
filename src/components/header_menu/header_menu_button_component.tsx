import React from 'react';
import { Button, Icon } from 'native-base';
import { Locale } from '../../locale';
import { values } from '../../application/styles';

export interface HeaderMenuButtonProps {
    readonly locale: Locale;
    readonly textColor: string;
}

export interface HeaderMenuButtonActions {
    readonly onPress: () => void;
}

export const HeaderMenuButtonComponent = (props: HeaderMenuButtonProps & HeaderMenuButtonActions): JSX.Element => {
    return (
        <Button transparent onPress={props.onPress} icon>
            <Icon name='bars' type='FontAwesome' style={{ color: props.textColor, fontSize: values.mediumIconSize }}/>
        </Button>
    );
};