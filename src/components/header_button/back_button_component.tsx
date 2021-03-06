import React from 'react';
import { I18nManager } from 'react-native';
import { Button, Icon } from 'native-base';
import { goBack } from '../../application/routing';
import { memoryHistory } from '../../application';

export interface BackButtonProps {
    readonly textColor: string;
}

export const BackButtonComponent = (props: BackButtonProps): JSX.Element => {
    return (
        <Button transparent onPress={(): void => goBack(memoryHistory)}>
            <Icon name={getIconForBackButton()} style={{ color: props.textColor, fontWeight: 'bold' }} />
        </Button>
    );
};

export const getIconForBackButton = (): string => {
    if (I18nManager.isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};
