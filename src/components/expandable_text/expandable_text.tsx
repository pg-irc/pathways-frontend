// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent, StyleSheet } from 'react-native';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown from 'react-native-markdown-renderer';
import { colors, markdownStyles, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { toggleExpandedState, ExpandableTextStates, shouldShowButton, defaultExpandableTextState, isDefaultState } from './expandable_text_states';

export interface ExpandableTextProps {
    readonly text: string;
    readonly isMarkdown: boolean;
    readonly textStyle?: object;
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
            expandableState: defaultExpandableTextState,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <View onLayout={this.onLayoutChange}>
                {this.renderText()}
                {this.renderButtonIfShown()}
            </View >
        );
    }

    private renderText(): JSX.Element {
        if (this.props.isMarkdown) {
            return (
                <Markdown style={{ ...this.getMarkdownStyle(), ...this.props.textStyle }}>
                    {this.props.text}
                </Markdown>
            );
        }
        return (
            <Text style={[ this.getTextStyle(), this.props.textStyle ]}>
                {this.props.text}
            </Text>
        );
    }

    private renderButtonIfShown(): JSX.Element {
        return shouldShowButton(this.state.expandableState) ? this.getButton() : <EmptyComponent />;
    }

    private getTextStyle(): object {
        if (this.isCollapsed()) {
            return {
                ...StyleSheet.flatten(textStyles.paragraphStyle),
                height: this.state.collapsedHeight,
            };
        }
        return textStyles.paragraphStyle;
    }

    // The type definitions for the Markdown library make breaking
    // out style object creation into separate functions hard ... maybe impossible?
    // The 'any' workaround seems cleanest here.
    // tslint:disable-next-line:no-any
    private getMarkdownStyle(): any {
        if (this.isCollapsed()) {
            return {
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
        }
        return markdownStyles;
    }

    private onLayoutChange(event: LayoutChangeEvent): void {
        const isUninitialized = isDefaultState(this.state.expandableState);
        const viewHeight = event.nativeEvent.layout.height;
        const isHeighAboveLimit = viewHeight > this.state.collapsedHeight;

        if (isUninitialized && isHeighAboveLimit) {
            this.enableExpansion();
        }
    }

    private enableExpansion(): void {
        this.setState({
            ...this.state,
            expandableState: ExpandableTextStates.isCollapsed,
        });
    }

    private toggleState(): void {
        this.setState({
            ...this.state,
            expandableState: toggleExpandedState(this.state.expandableState),
        });
    }

    private getButton(): JSX.Element {
        const onPress = (): void => this.toggleState();
        const text = this.isCollapsed() ? <Trans>Read more</Trans> : <Trans>Read less</Trans>;
        return (
            <Button onPress={onPress} rounded style={{
                backgroundColor: colors.darkerGrey,
                alignSelf: 'center',
                marginTop: 10,
            }}>
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    {text}
                </Text>
            </Button>
        );
    }

    private isCollapsed(): boolean {
        return this.state.expandableState === ExpandableTextStates.isCollapsed;
    }
}
