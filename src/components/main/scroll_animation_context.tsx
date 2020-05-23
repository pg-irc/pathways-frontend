import Constants from 'expo-constants';
// @ts-ignore variables is exported by native base but is not defined by the types file
import { Footer, FooterTab, variables } from 'native-base';
import React, { useRef } from 'react';
import Animated from 'react-native-reanimated';

const HEADER_HEIGHT = 44;

const FOOTER_HEIGHT: number = 55;

const getFooterStyles = (): FooterStyles => {
    if (variables.isIphoneX) {
        return {
            height: FOOTER_HEIGHT + variables.Inset.portrait.bottomInset,
            paddingBottom: variables.Inset.portrait.bottomInset,
        };
    }

    return {
        height: FOOTER_HEIGHT,
        paddingBottom: 0,
    };
};

export interface FooterStyles {
    readonly height: number;
    readonly paddingBottom: number;
}

export interface ScrollAnimationContext {
    readonly animatedFooterHeight: Animated.Node<number>;
    readonly animatedFooterBottomPadding: Animated.Node<number>;
    readonly animatedFooterIconVerticalTranslate: Animated.Node<number>;
    readonly animatedHeaderHeight: Animated.Node<number>;
    readonly getAnimatedFlatListScrollHandler: (onScroll: (e: any) => void) => (...args: readonly any[]) => void;
}

interface ScrollEventMap {
    readonly nativeEvent: {
        readonly contentOffset: {
            readonly y: (y: number) => Animated.Node<number>,
        },
    };
}

interface EventConfig {
    readonly listener?: Function;
    readonly useNativeDriver: boolean;
}

const { height: footerHeight, paddingBottom: footerPaddingBottom }: FooterStyles = getFooterStyles();

const TOTAL_HEADER_HEIGHT: number = HEADER_HEIGHT + Constants.statusBarHeight;

const TOTAL_FOOTER_HEIGHT = footerHeight + footerPaddingBottom;

const FOOTER_ICON_HEIGHT = 30;

const CLAMPED_SCROLL_LOWER_BOUND = 0;

const CLAMPED_SCROLL_UPPER_BOUND = Math.max(TOTAL_HEADER_HEIGHT, TOTAL_FOOTER_HEIGHT);

export const createScrollAnimationContext = (): ScrollAnimationContext => {
    const animatedScrollValueRef = useRef(new Animated.Value(0));

    const upwardScrollInterpolatedValue = Animated.interpolate(animatedScrollValueRef.current, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: Animated.Extrapolate.CLAMP,
    });

    const animatedClampedScrollValueRef = useRef(
        Animated.diffClamp(
            upwardScrollInterpolatedValue,
            CLAMPED_SCROLL_LOWER_BOUND,
            CLAMPED_SCROLL_UPPER_BOUND,
        ),
    );

    const animatedHeaderHeight = Animated.interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, TOTAL_HEADER_HEIGHT],
        outputRange: [TOTAL_HEADER_HEIGHT, Constants.statusBarHeight],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const animatedFooterHeight = Animated.interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, footerHeight],
        outputRange: [footerHeight, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const animatedFooterBottomPadding = Animated.interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, footerPaddingBottom],
        outputRange: [footerPaddingBottom, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const animatedFooterIconVerticalTranslate =  Animated.interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [footerPaddingBottom, footerHeight],
        outputRange: [0, footerHeight - FOOTER_ICON_HEIGHT],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const getAnimatedFlatListScrollHandler = (onScroll: (e: any) => void): (mapping: readonly ScrollEventMap[], config: EventConfig) => void => {
        const eventArgumentMapping: readonly [ScrollEventMap] = [{
            nativeEvent: {
                contentOffset: {
                    y: (y: number): Animated.Node<number> => (
                        Animated.block([
                            Animated.set(animatedScrollValueRef.current, y),
                            Animated.call([y], ([offsetY]: readonly number[]): void => onScroll(offsetY)),
                        ])
                    ),
                },
            },
        }];

        const eventConfig =  {
            listener: onScroll,
            useNativeDriver: true,
        };

        return Animated.event<ScrollEventMap>(eventArgumentMapping, eventConfig);
    };

    return {
        animatedFooterHeight,
        animatedFooterBottomPadding,
        animatedFooterIconVerticalTranslate,
        animatedHeaderHeight,
        getAnimatedFlatListScrollHandler,
    };
};

export const ScrollContext = React.createContext<Partial<ScrollAnimationContext>>({});