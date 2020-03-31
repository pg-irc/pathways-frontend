import React from 'react';
import { Button, Icon } from 'native-base';
import { values } from '../../application/styles';

export interface MenuButtonProps {
    readonly textColor: string;
}

export interface MenuButtonActions {
    readonly onPress: () => void;
}

export const MenuButtonComponent = (props: MenuButtonProps & MenuButtonActions): JSX.Element => {
    return (
        <Button transparent onPress={props.onPress} icon>
            <Icon name='bars' type='FontAwesome' style={{ color: props.textColor, fontSize: values.mediumIconSize }}/>
        </Button>
    );
};
