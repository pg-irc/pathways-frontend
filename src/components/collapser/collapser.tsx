// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { View, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

export interface Props {
    readonly collapsedHeader: JSX.Element;
    readonly expandedHeader: JSX.Element;
    readonly content: JSX.Element;
    readonly initiallyCollapsed: boolean;
    readonly style?: object;
}

interface State {
    collapsed: boolean;
}

export class Collapser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { collapsed: this.props.initiallyCollapsed };
    }

    render(): JSX.Element {
        return (
            <View>
                <ListItem
                    style={this.props.style ? this.props.style : undefined}
                    noBorder button noIndent onPress={(): void => this.toggleCollapsed()}>
                    {this.state.collapsed ? this.props.collapsedHeader : this.props.expandedHeader}
                </ListItem>
                <Collapsible collapsed={this.state.collapsed}>
                    {this.props.content}
                </Collapsible>
            </View>
        );
    }

    toggleCollapsed(): void {
        this.setState({ collapsed: !this.state.collapsed});
    }
}
