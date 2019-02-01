import React from 'react';
import { Button, Icon } from 'native-base';

interface CloseButtonActions {
    readonly onPress: () => void;
}

interface CloseButtonProps {
    readonly color: string;
}

type Props = CloseButtonActions & CloseButtonProps;

export const CloseButtonComponent = (props: Props): JSX.Element => (
    <Button icon transparent onPress={props.onPress}>
        <Icon name='times' type={'FontAwesome'} style={{ color: props.color }} />
    </Button>
);
