import React from 'react';
import { Button, Icon } from 'native-base';
import { Locale } from '../../locale';
import { values } from '../../application/styles';

export interface Props {
    readonly locale: Locale;
    readonly textColor: string;
}

export interface Actions {
    readonly onPress: () => void;
}

export const HeaderMenuButtonComponent = (props: Props & Actions): JSX.Element => {
    return (
        <Button transparent onPress={props.onPress} icon>
            <Icon name='bars' type='FontAwesome' style={{ color: props.textColor, fontSize: values.mediumIconSize }}/>
        </Button>
    );
};