import React from 'react';
import { I18nManager } from 'react-native';
import { History } from 'history';
import { Button, Icon } from 'native-base';
import { goBack } from '../../application/routing';
import { colors } from '../../application/styles';

export interface BackButtonProps {
    readonly history: History;
}

export const BackButtonComponent = (props: BackButtonProps): JSX.Element => {
    return (
        <Button transparent onPress={(): void => goBack(props.history)}>
            <Icon name={getIconForBackButton()} style={{ color: colors.black, fontWeight: 'bold' }} />
        </Button>
    );
};

const getIconForBackButton = (): string => {
    if (I18nManager.isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};
