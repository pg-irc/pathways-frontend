import React from 'react';
import { Text, Button, Icon } from 'native-base';
import { Locale, LocaleInfoManager } from '../../locale';
import { colors } from '../../application/styles';

export interface Props {
    readonly locale: Locale;
}

export interface Actions {
    readonly onPress: () => void;
}

export const CurrentLocale = (props: Props & Actions): JSX.Element => {
    const locale = LocaleInfoManager.get(props.locale.code);
    return (
        <Button transparent onPress={props.onPress}>
            <Text style={{ color: colors.white, fontWeight: 'bold' }}>{locale.code.toUpperCase()}</Text>
            <Icon name='arrow-down' style={{ color: colors.white }}/>
        </Button>
    );
};