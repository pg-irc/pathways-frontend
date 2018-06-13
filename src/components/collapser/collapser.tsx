// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { View, ListItem } from 'native-base';
import Collapsible from 'react-native-collapsible';

export interface Props {
    readonly collapsedHeader: JSX.Element;
    readonly expandedHeader: JSX.Element;
    readonly data: JSX.Element;
    readonly collapsed: boolean;
    readonly style?: object;
}

export interface State {
    collapsed: boolean;
}

export class Collapser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { collapsed: this.props.collapsed };
    }

    render(): JSX.Element {
        return (
            <View>
                <ListItem
                    style={this.props.style ? this.props.style : undefined}
                    noBorder button noIndent onPress={(): void => this.toggleCollapsed()}>
                    { this.state.collapsed ? this.props.collapsedHeader : this.props.expandedHeader}
                </ListItem>
                <Collapsible collapsed={this.state.collapsed}>
                    {this.props.data}
                </Collapsible>
            </View>
        );
    }

    toggleCollapsed(): void {
        this.setState({ collapsed: !this.state.collapsed});
    }
}
