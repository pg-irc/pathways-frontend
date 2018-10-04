// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import Markdown from 'react-native-markdown-renderer';
import { colors, values, markdownStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { getNextExpandableTextState, ExpandableTextStates } from './expandable_text_states';

export interface ExpandableTextProps {
    readonly text: string;
}

interface ExpandableTextState {
    readonly collapsedHeight: number;
    readonly expandableState: ExpandableTextStates;
}

export class ExpandableText extends React.Component<ExpandableTextProps, ExpandableTextState> {

    constructor(props: ExpandableTextProps) {
        super(props);
        const screenHeight = Dimensions.get('screen').height;
        const oneEighthTheScreen = Math.round(screenHeight / 8);
        this.state = {
            collapsedHeight: oneEighthTheScreen,
            expandableState: ExpandableTextStates.isNotExpandable,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    render(): JSX.Element {
        const style = this.isCollapsed() ? {...markdownStyles, root: this.getRootStyles()} : markdownStyles;
        return (
            <View onLayout={this.onLayoutChange}>
                <View>
                    <Markdown style={style}>{this.props.text}</Markdown>
                    {this.shouldHaveButton() ? this.getButton() : <EmptyComponent />}
                </View>
            </View >
        );
    }

    private onLayoutChange(event: LayoutChangeEvent): void {
        const viewHeight = event.nativeEvent.layout.height;
        if (viewHeight > this.state.collapsedHeight) {
            if (this.isNotExpandable()) {
                this.setNextExpandableState();
            }
        }
    }

    private setNextExpandableState(): void {
        this.setState({
            ...this.state,
            expandableState: getNextExpandableTextState(this.state.expandableState),
        });
    }

    private getRootStyles(): object {
        return {
            // Cast string: 'scroll' to scroll type or we get same error as: https://github.com/Microsoft/TypeScript/issues/11465.
            // It's possible the type defintion for style.root is wrong.
            overflow: 'scroll' as 'scroll',
            // Applying a transparent background ensures our button falls below the markdown.
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            height: this.state.collapsedHeight,
        };
    }

    private shouldHaveButton(): boolean {
        return this.isCollapsed() || this.isExpanded();
    }

    private getButton(): JSX.Element {
        const onPress = (): void => this.setNextExpandableState();
        const iconStyle = { fontSize: values.smallerIconSize, padding: 3 };
        const icon = this.isCollapsed() ? 'arrow-dropdown' : 'arrow-dropup';
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

    private isNotExpandable(): boolean {
        return this.state.expandableState === ExpandableTextStates.isNotExpandable;
    }

    private isCollapsed(): boolean {
        return this.state.expandableState === ExpandableTextStates.isExpandableAndCollapsed;
    }

    private isExpanded(): boolean {
        return this.state.expandableState === ExpandableTextStates.isExpandableAndExpanded;
    }

}
