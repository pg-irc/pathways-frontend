import React from 'react';
import { colors } from '../../application/styles';
import { History } from 'history';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { HelpButtonComponent } from '../header_button/help_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { HeaderComponent } from '../main/header_component';

export interface HelpAndMenuButtonHeaderProps {
    readonly history: History;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

export const HelpAndMenuButtonHeaderComponent = (props: HelpAndMenuButtonHeaderProps): JSX.Element => {
    const textColor = colors.teal;
    const backgroundColor = colors.white;
    const leftButton = <HelpButtonComponent history={props.history} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;

    return (
        <HeaderComponent
            backgroundColor={backgroundColor}
            leftButton={leftButton}
            rightButtons={[rightButton]}
        />
    );
};