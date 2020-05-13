import React from 'react';
import { Trans } from '@lingui/react';
import { Header, Icon, Text, Title } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles } from '../../application/styles';
import { otherRemoveServiceStyles as styles } from './styles';

type HeaderProps = {
    readonly headerLabel: TemplateStringsArray;
    readonly close: () => void;
    readonly back: () => void;
};

export const HeaderComponent = ({ headerLabel, close, back }: HeaderProps): JSX.Element => (
    <Header style={styles.headerContainer}>
        <TouchableOpacity onPress={back} style={{ paddingLeft: 15 }}>
            <Icon name='chevron-left' type='FontAwesome' style={styles.headerElement}/>
        </TouchableOpacity>
        <Title style={{ paddingLeft: 15}}>
            <Text style={textStyles.headline6}>
                <Trans id={headerLabel} />
            </Text>
        </Title>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={close}
        />
    </Header>
);
