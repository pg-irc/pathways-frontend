import React from 'react';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { HeaderComponent } from '../main/header_component';

export interface MenuAndBackButtonHeaderProps {
    readonly textColor: string;
    readonly backgroundColor: string;
    readonly title?: JSX.Element;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

export const MenuAndBackButtonHeaderComponent = (props: MenuAndBackButtonHeaderProps): JSX.Element => {
    const leftButton = <BackButtonComponent textColor={props.textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={props.textColor}
        />;

    return (
        <HeaderComponent
            backgroundColor={props.backgroundColor}
            leftButton={leftButton}
            rightButtons={[rightButton]}
            title={props.title}
        />
    );
};