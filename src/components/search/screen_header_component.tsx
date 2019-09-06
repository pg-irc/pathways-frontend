import React from 'react';
import { Header, Right, Title } from 'native-base';
import { SearchComponentProps, SearchComponentActions } from './search_component';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { colors } from '../../application/styles';

type Props = SearchComponentProps & SearchComponentActions;

export const ScreenHeaderComponent = (props: Props): JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    return <Header style={{ marginTop, backgroundColor: colors.teal, borderBottomColor: 'transparent' }}>
        <Title>Find a service</Title>
        <Right style={{ alignItems: 'center' }}>
            <MenuButtonComponent
                onPress={props.openMenu}
                locale={props.currentLocale}
                textColor={colors.white}
            />
        </Right>
    </Header>;
};
