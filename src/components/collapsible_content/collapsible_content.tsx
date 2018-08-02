import React from 'react';
import { View, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

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
        <ListItem
            style={props.style ? props.style : undefined}
            noBorder button noIndent onPress={(): void => props.onHeaderPress()}>
            {props.isCollapsed ? props.collapsedHeader : props.expandedHeader}
        </ListItem>
        <Collapsible collapsed={props.isCollapsed}>
            {props.content}
        </Collapsible>
    </View>
);
