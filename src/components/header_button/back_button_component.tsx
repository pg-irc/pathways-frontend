import React from 'react';
import { Button, Icon } from 'native-base';
import { goBack } from '../../application/routing';
import { memoryHistory } from '../../application';

export interface BackButtonProps {
    readonly textColor: string;
    readonly isRTL: boolean;
}

export const BackButtonComponent = (props: BackButtonProps): JSX.Element => {
    return (
        <Button transparent onPress={(): void => goBack(memoryHistory)}>
            <Icon name={getIconForBackButton(props.isRTL)} style={{ color: props.textColor, fontWeight: 'bold' }} />
        </Button>
    );
};

export const getIconForBackButton = (isRTL: boolean): string => {
    if (isRTL) {
        return 'arrow-forward';
    }
    return 'arrow-back';
};
