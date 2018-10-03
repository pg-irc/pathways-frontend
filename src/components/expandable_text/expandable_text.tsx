// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { View, Icon } from 'native-base';
import { Dimensions, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { colors, values, markdownStyles } from '../../application/styles';
import Markdown from 'react-native-markdown-renderer';

export interface ExpandableTextProps {
    readonly text: string;
}

interface ExpandableTextState {
    readonly isCollapsed: boolean;
    readonly hasBeenCollapsed: boolean;
    readonly collapsedHeight: number;
}

export class ExpandableText extends React.Component<ExpandableTextProps, ExpandableTextState> {

    constructor(props: ExpandableTextProps) {
        super(props);
        const screenHeight = Dimensions.get('screen').height;
        const oneEighthTheScreen = Math.round(screenHeight / 8);
        this.state = {
            isCollapsed: false,
            hasBeenCollapsed: false,
            collapsedHeight: oneEighthTheScreen,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <View onLayout={this.onLayoutChange}>
                {this.state.isCollapsed ? this.getCollapsedComponent() : this.getExpandedComponent()}
            </View >
        );
    }

    private onLayoutChange(event: LayoutChangeEvent): void {
        const viewHeight = event.nativeEvent.layout.height;
        const shouldBeCollapsed = viewHeight > this.state.collapsedHeight && this.state.hasBeenCollapsed === false;

        // TODO Animate the re-render to avoid screen flash
        if (shouldBeCollapsed) {
            this.setState({ isCollapsed: true, hasBeenCollapsed: true });
        }
    }

    private toggleIsCollapsed(): void {
        this.setState({
            ...this.state,
            isCollapsed: !this.state.isCollapsed,
        });
    }

    private getCollapsedComponent(): JSX.Element {
        // By default the Markdown component content flows out of the enclosing View when a height is set.
        // These styles make the component play nice.
        const style = {
            ...markdownStyles,
            root: {
                // Cast string: 'scroll' to scroll type or we get same error as: https://github.com/Microsoft/TypeScript/issues/11465.
                // It's possible the type defintion for style.root is wrong.
                overflow: 'scroll' as 'scroll',
                // Applying a transparent background ensures our button falls below the markdown.
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: this.state.collapsedHeight,
            },
        };
        return (
            <View>
                <Markdown style={style}>{this.props.text}</Markdown>
                {this.getButton('arrow-dropdown')}
            </View>
        );
    }

    private getExpandedComponent(): JSX.Element {
        return (
            <View>
                <Markdown style={markdownStyles}>{this.props.text}</Markdown>
                {this.state.hasBeenCollapsed ?  this.getButton('arrow-dropup') : undefined}
            </View>
        );
    }

    private getButton(icon: string): JSX.Element {
        const onPress = (): void => this.toggleIsCollapsed();
        const iconStyle = { fontSize: values.smallerIconSize, padding: 3 };
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[
                    { backgroundColor: colors.lightGrey },
                    { marginTop: 5 },
                    { borderRadius: 5 },
                ]}>
                    <View style={[
                        { justifyContent: 'center' },
                        { alignItems: 'center' },
                    ]}>
                        <Icon name={icon} style={iconStyle} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
