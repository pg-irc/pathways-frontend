// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { Dimensions, LayoutChangeEvent, Animated, I18nManager, TouchableOpacity, ViewStyle } from 'react-native';
import { View, Text, Icon } from 'native-base';
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
        const style = this.isCollapsed() ? this.getCollapsedStyle() : {};
        return (
            <View style={style}>
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

    private readMoreReadLessText(): JSX.Element | string {
        const showReadMore = this.isCollapsed();
        if (showReadMore) {
            return this.props.forceEnglish ? 'Read more' : <Trans>Read more</Trans>;
        }
        return this.props.forceEnglish ? 'Read less' : <Trans>Read less</Trans>;
    }

    private getReadMoreButton(): JSX.Element {
        const buttonOnPress = (): void => this.toggleState();
        const buttonStyle: ViewStyle = {
            flex: 1,
            flexDirection: 'row',
            justifyContent: this.computeJustifyContent(),
            maxHeight: 20,
            marginTop: 10,
        };
        const buttonText = (
            <Text style={[
                    textStyles.paragraphBoldBlackLeft,
                    {
                        color: colors.teal,
                        marginRight: 5,
                    },
                ]}
            >
                    {this.readMoreReadLessText()}
            </Text>
        );
        const buttonIcon = (
            <Icon
                name={this.isCollapsed() ? 'arrow-down' : 'arrow-up'}
                style={{
                    fontSize: values.smallIconSize,
                    color: colors.teal,
                    paddingLeft: this.flipLeftRightOrientation() ? 10 : 0,
                    paddingRight: this.flipLeftRightOrientation() ? 0 : 10,
                }}
            />
        );

        return this.flipLeftRightOrientation() ?
            <TouchableOpacity onPress={buttonOnPress} style={buttonStyle}>
                {buttonIcon}
                {buttonText}
            </TouchableOpacity> :
            <TouchableOpacity onPress={buttonOnPress} style={buttonStyle}>
                {buttonText}
                {buttonIcon}
            </TouchableOpacity>;
    }

    private flipLeftRightOrientation(): boolean {
        return I18nManager.isRTL && this.props.forceEnglish;
    }

    private computeJustifyContent(): 'flex-start' | 'flex-end' {
        // If the app locale is Arabic and the screen is in English, justify "Read more"
        // string to the left by returning 'flex-end', which in RTL mode means left.
        if (this.flipLeftRightOrientation()) {
            return 'flex-end';
        }
        return 'flex-start';
    }

    private isCollapsed(): boolean {
        return this.state.expandableState === ExpandableContentStates.isCollapsed;
    }
}
