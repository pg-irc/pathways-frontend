import React from 'react';
import { Text, Button, Icon } from 'native-base';
import { Locale, LocaleInfoManager } from '../../locale';
import { colors } from '../../application/styles';
import { isOnParentScreen } from '../../application/routing';

export interface Props {
    readonly locale: Locale;
    readonly currentPath: string;
}

export interface Actions {
    readonly onPress: () => void;
}

export const CurrentLocale = (props: Props & Actions): JSX.Element => {
    const locale = LocaleInfoManager.get(props.locale.code);
    const color = isOnParentScreen(props.currentPath) ? colors.white : colors.topaz;
    return (
        <Button transparent onPress={props.onPress}>
            <Text style={{ color: color, fontWeight: 'bold' }}>{locale.code.toUpperCase()}</Text>
            <Icon name='arrow-down' style={{ color: color }}/>
        </Button>
    );
};