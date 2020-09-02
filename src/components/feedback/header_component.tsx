import React from 'react';
import { Trans } from '@lingui/react';
import { Header, Text } from 'native-base';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles } from '../../application/styles';
import { otherRemoveServiceStyles as styles } from './styles';
import { View } from 'react-native';

type HeaderProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly close: () => void;
};

export const HeaderComponent = ({ headerLabel, close }: HeaderProps): JSX.Element => (
    <Header style={ styles.headerContainer } androidStatusBarColor={colors.teal}>
        <View style={{ flex: 4, paddingHorizontal: 15 }}>
            <Text style={textStyles.headline6}>
                <Trans id={headerLabel} />
            </Text>
        </View>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={close}
        />
    </Header>
);
