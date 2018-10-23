import React from 'react';
import { View } from 'native-base';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native';

export interface CollapsibleComponentProps {
    readonly collapsedHeader: JSX.Element;
    readonly expandedHeader: JSX.Element;
    readonly content: JSX.Element;
    readonly isCollapsed: boolean;
    readonly style?: object;
}
export interface CollapsibleComponentActions {
    readonly onHeaderPress: () => void;
}

type Props = CollapsibleComponentProps & CollapsibleComponentActions;

export const CollapsibleContent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View>
        <TouchableOpacity
            style={props.style ? props.style : undefined}
            onPress={(): void => props.onHeaderPress()}>
            {props.isCollapsed ? props.collapsedHeader : props.expandedHeader}
        </TouchableOpacity>
        <Collapsible collapsed={props.isCollapsed}>
            {props.content}
        </Collapsible>
    </View>
);
