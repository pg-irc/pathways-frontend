import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { values, colors } from '../../application/styles';

interface Props {
    readonly visible: boolean;
    readonly onPress: () => void;
}

export const ClearInputButton = (props: Props): JSX.Element => {
    if (!props.visible) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={{ padding: 12 }}>
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: values.smallIconSize, color: colors.white }} />
        </TouchableOpacity>
    );
};
