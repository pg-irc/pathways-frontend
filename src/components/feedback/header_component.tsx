import React from 'react';
import { Trans } from '@lingui/react';
import { Header, Text } from 'native-base';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles } from '../../application/styles';
import { otherRemoveServiceStyles as styles } from './styles';

type HeaderProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly close: () => void;
};

export const HeaderComponent = ({ headerLabel, close }: HeaderProps): JSX.Element => (
    <Header style={ styles.headerContainer } androidStatusBarColor={colors.teal}>
        <Text style={[textStyles.headline6, { paddingHorizontal: 15 }]}>
            <Trans id={headerLabel} />
        </Text>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={close}
        />
    </Header>
);
