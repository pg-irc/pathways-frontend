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
    readonly footerAnimatedHeight: Animated.Node<number>;
    readonly footerAnimatedBottomPadding: Animated.Node<number>;
    readonly headerAnimatedHeight: Animated.Node<number>;
    readonly getAnimatedFlatListScrollHandler: (onScroll: (e: any) => void) => (...args: readonly any[]) => void;
}

interface ScrollEventMap {
    readonly nativeEvent: {
        readonly contentOffset: {
            readonly y: Animated.Value<number>,
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

const CLAMPED_SCROLL_LOWER_BOUND = 0;

const CLAMPED_SCROLL_UPPER_BOUND = Math.max(TOTAL_HEADER_HEIGHT, TOTAL_FOOTER_HEIGHT);

export const createScrollAnimationContext = (): ScrollAnimationContext => {
    const scrollAnimatedValueRef = useRef(new Animated.Value(0));

    const upwardScrollInterpolatedValue = Animated.interpolate(scrollAnimatedValueRef.current, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: Animated.Extrapolate.CLAMP,
    });

    const clampedScrollAnimatedValueRef = useRef<Animated.Node<number>>(
        Animated.diffClamp(
            upwardScrollInterpolatedValue,
            CLAMPED_SCROLL_LOWER_BOUND,
            CLAMPED_SCROLL_UPPER_BOUND,
        ),
    );

    const headerAnimatedHeight = Animated.interpolate(clampedScrollAnimatedValueRef.current, {
        inputRange: [0, TOTAL_HEADER_HEIGHT],
        outputRange: [TOTAL_HEADER_HEIGHT, Constants.statusBarHeight],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const footerAnimatedHeight = Animated.interpolate(clampedScrollAnimatedValueRef.current, {
        inputRange: [0, footerHeight],
        outputRange: [footerHeight, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const footerAnimatedBottomPadding = Animated.interpolate(clampedScrollAnimatedValueRef.current, {
        inputRange: [0, footerPaddingBottom],
        outputRange: [footerPaddingBottom, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
    });

    const getAnimatedFlatListScrollHandler = (onScroll: (e: any) => void): (mapping: readonly ScrollEventMap[], config: EventConfig) => void => {
        const eventArgumentMapping: readonly [ScrollEventMap] = [{
            nativeEvent: {
                contentOffset: {
                    y: scrollAnimatedValueRef.current,
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
        footerAnimatedHeight,
        footerAnimatedBottomPadding,
        headerAnimatedHeight,
        getAnimatedFlatListScrollHandler,
    };
};

export const ScrollContext = React.createContext<Partial<ScrollAnimationContext>>({});