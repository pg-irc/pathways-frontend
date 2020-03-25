import React from 'react';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { History } from 'history';
import { renderHeader } from '../main/render_header';

export interface MenuAndBackButtonHeaderProps {
    readonly textColor: string;
    readonly backgroundColor: string;
    readonly title?: JSX.Element;
    readonly history: History;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

export const MenuAndBackButtonHeaderComponent = (props: MenuAndBackButtonHeaderProps): JSX.Element => {
    const leftButton = <BackButtonComponent history={props.history} textColor={props.textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={props.textColor}
        />;
    return renderHeader({ ...props, leftButton, rightButtons: [rightButton] });
};