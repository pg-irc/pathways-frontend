// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { View, Text, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { toggleExpandedState, ExpandableContentStates, shouldShowButton,
         defaultExpandableContentState, isDefaultState } from './expandable_content_states';

export interface ExpandableContentProps {
    readonly content: JSX.Element;
    readonly contentBackgroundColor?: string;
}

interface ExpandableContentState {
    readonly collapsedHeight: number;
    readonly expandableState: ExpandableContentStates;
}

export class ExpandableContentComponent extends React.Component<ExpandableContentProps, ExpandableContentState> {

    constructor(props: ExpandableContentProps) {
        super(props);
        const screenHeight = Dimensions.get('screen').height;
        const oneEighthTheScreen = Math.round(screenHeight / 8);
        this.state = {
            collapsedHeight: oneEighthTheScreen,
            expandableState: defaultExpandableContentState,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <View onLayout={this.onLayoutChange}>
                {this.renderContent()}
                {this.renderButtonIfShown()}
            </View >
        );
    }

    private renderContent(): JSX.Element {
        const style = {
            paddingHorizontal: 5,
            paddingBottom: 20,
        };
        return (
            <View style={this.isCollapsed() ? { ...this.getCollapsedStyle(), ...style  } : style}>
                {this.props.content}
            </View>
        );
    }

    private getCollapsedStyle(): object {
        return {
            height: this.state.collapsedHeight,
            overflow: 'hidden',
        };
    }

    private renderButtonIfShown(): JSX.Element {
        return shouldShowButton(this.state.expandableState) ? this.getButton() : <EmptyComponent />;
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
            expandableState: ExpandableContentStates.isCollapsed,
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
        const paddingTop = this.isCollapsed() ? 3 : 0;
        const backgroundColor = this.props.contentBackgroundColor ? this.props.contentBackgroundColor : colors.white;
        return (
            <View style={{ backgroundColor, paddingTop }}>
                <Button
                    onPress={onPress}
                    rounded
                    style={{
                        backgroundColor: colors.darkerGrey,
                        alignSelf: 'center',
                    }}>
                    <Text style={textStyles.paragraphBoldBlackLeft}>
                        {text}
                    </Text>
                </Button>
            </View>
        );
    }

    private isCollapsed(): boolean {
        return this.state.expandableState === ExpandableContentStates.isCollapsed;
    }
}
