// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent, Animated, I18nManager } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import {
    toggleExpandedState, ExpandableContentStates, shouldShowReadMoreButton,
    defaultExpandableContentState, isDefaultState,
} from './expandable_content_states';
import { values } from '../../application/styles';

export interface ExpandableContentProps {
    readonly content: JSX.Element;
    readonly contentId?: string;
    readonly contentBackgroundColor?: string;
    readonly forceEnglish?: boolean;
}

interface ExpandableContentState {
    readonly collapseAtHeight: number;
    readonly expandableState: ExpandableContentStates;
    readonly fadeAnimation: Animated.Value;
}

export class ExpandableContentComponent extends React.Component<ExpandableContentProps, ExpandableContentState> {

    constructor(props: ExpandableContentProps) {
        super(props);
        this.state = this.getDefaultState();
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentDidMount(): void {
        this.fadeInContent();
    }

    componentDidUpdate(prevProps: ExpandableContentProps): void {
        if (prevProps.contentId !== this.props.contentId) {
            this.setState(this.getDefaultState(), () => this.fadeInContent());
        }
    }

    render(): JSX.Element {
        return (
            <Animated.View onLayout={this.onLayoutChange} style={{ opacity: this.state.fadeAnimation }}>
                {this.renderContent()}
                {this.renderReadMoreButtonIfShown()}
            </Animated.View >
        );
    }

    getDefaultState(): ExpandableContentState {
        const screenHeight = Dimensions.get('screen').height;
        const oneEighthTheScreen = Math.round(screenHeight / 8);
        return {
            collapseAtHeight: oneEighthTheScreen,
            expandableState: defaultExpandableContentState,
            fadeAnimation: new Animated.Value(0),
        };
    }

    private fadeInContent(): void {
        Animated.timing(
            this.state.fadeAnimation,
            {
                toValue: 1,
                duration: 300,
            },
        ).start();
    }

    private renderContent(): JSX.Element {
        const style = {
            paddingHorizontal: 5,
        };
        return (
            <View style={this.isCollapsed() ? { ...this.getCollapsedStyle(), ...style } : style}>
                {this.props.content}
            </View>
        );
    }

    private getCollapsedStyle(): object {
        return {
            height: this.state.collapseAtHeight,
            overflow: 'hidden',
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

    private readMoreReadLessText(): JSX.Element {
        const showReadMore = this.isCollapsed();
        if (showReadMore) {
            return this.props.forceEnglish ? <Text>Read more</Text> : <Trans>Read more</Trans>;
        }
        return this.props.forceEnglish ? <Text>Read less</Text> : <Trans>Read less</Trans>;
    }

    private getReadMoreButton(): JSX.Element {
        const onPress = (): void => this.toggleState();
        const text = this.readMoreReadLessText();
        const backgroundColor = this.props.contentBackgroundColor ? this.props.contentBackgroundColor : colors.white;
        const flipJustification = I18nManager.isRTL && this.props.forceEnglish;
        const justifyContent = flipJustification ? 'flex-end' : 'flex-start';
        return (
            <View style={{ backgroundColor, flex: 1, flexDirection: 'row', justifyContent }} >
                <Button
                    onPress={onPress}
                    transparent
                    iconRight
                >
                    <Text style={[
                        textStyles.paragraphBoldBlackLeft,
                        {
                            color: colors.teal,
                            paddingLeft: 6,
                            paddingRight: 8,
                        },
                    ]}
                    >
                        {text}
                    </Text>
                    <Icon
                        name={this.isCollapsed() ? 'arrow-down' : 'arrow-up'}
                        style={{
                            fontSize: values.smallIconSize,
                            color: colors.teal,
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
