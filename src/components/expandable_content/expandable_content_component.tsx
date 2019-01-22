// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { toggleExpandedState, ExpandableContentStates, shouldShowReadMoreButton,
         defaultExpandableContentState, isDefaultState } from './expandable_content_states';
import { values } from '../../application/styles';

export interface ExpandableContentProps {
    readonly content: JSX.Element;
    readonly contentId?: string;
    readonly contentBackgroundColor?: string;
}

interface ExpandableContentState {
    readonly collapseAtHeight: number;
    readonly expandableState: ExpandableContentStates;
}

export class ExpandableContentComponent extends React.Component<ExpandableContentProps, ExpandableContentState> {

    constructor(props: ExpandableContentProps) {
        super(props);
        this.state = this.getDefaultState();
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentDidUpdate(prevProps: ExpandableContentProps): void {
        if (prevProps.contentId !== this.props.contentId) {
            this.setState(this.getDefaultState());
        }
    }

    render(): JSX.Element {
        return (
            <View onLayout={this.onLayoutChange}>
                {this.renderContent()}
                {this.renderReadMoreButtonIfShown()}
            </View >
        );
    }

    getDefaultState(): ExpandableContentState {
        const screenHeight = Dimensions.get('screen').height;
        const oneEighthTheScreen = Math.round(screenHeight / 8);
        return {
            collapseAtHeight: oneEighthTheScreen,
            expandableState: defaultExpandableContentState,
        };
    }

    private renderContent(): JSX.Element {
        const style = {
            paddingHorizontal: 5,
        };
        return (
            <View style={this.isCollapsed() ? { ...this.getCollapsedStyle(), ...style  } : style}>
                {this.props.content}
            </View>
        );
    }

    private getCollapsedStyle(): object {
        return {
            height: this.state.collapseAtHeight,
            overflow: 'scroll',
        };
    }

    private renderReadMoreButtonIfShown(): JSX.Element {
        return shouldShowReadMoreButton(this.state.expandableState) ? this.getReadMoreButton() : <EmptyComponent />;
    }

    private onLayoutChange(event: LayoutChangeEvent): void {
        const isUninitialized = isDefaultState(this.state.expandableState);
        const viewHeight = event.nativeEvent.layout.height;
        const readMoreButtonHeight = 45;
        const heightIsAboveLimit = viewHeight > this.state.collapseAtHeight + readMoreButtonHeight;

        if (isUninitialized && heightIsAboveLimit) {
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

    private getReadMoreButton(): JSX.Element {
        const onPress = (): void => this.toggleState();
        const text = this.isCollapsed() ? <Trans>Read more</Trans> : <Trans>Read less</Trans>;
        const backgroundColor = this.props.contentBackgroundColor ? this.props.contentBackgroundColor : colors.white;
        return (
            <View style={{ backgroundColor }}>
                <Button
                    onPress={onPress}
                    transparent
                    iconRight
                >
                    <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.topaz, paddingLeft: 6 }]}>
                        {text}
                    </Text>
                    <Icon
                        name={this.isCollapsed() ? 'arrow-down' : 'arrow-up'}
                        style={{
                            fontSize: values.smallIconSize,
                            color: colors.topaz,
                        }}
                    />
                </Button>
            </View>
        );
    }

    private isCollapsed(): boolean {
        return this.state.expandableState === ExpandableContentStates.isCollapsed;
    }
}
