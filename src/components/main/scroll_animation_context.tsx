import Constants from 'expo-constants';
// @ts-ignore variables is exported by native base but is not defined by the types file
import { Footer, FooterTab, variables } from 'native-base';
import React, { useMemo, useRef } from 'react';
import {
    Clock,
    Easing,
    Extrapolate,
    Node,
    Value,
    clockRunning,
    cond,
    block,
    diffClamp,
    event,
    interpolate,
    set,
    startClock,
    stopClock,
    timing,
} from 'react-native-reanimated';

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
    readonly animatedFooterHeight: Node<number>;
    readonly animatedFooterBottomPadding: Node<number>;
    readonly animatedFooterIconVerticalTranslate: Node<number>;
    readonly animatedHeaderHeight: Node<number>;
    readonly onAnimatedScrollHandler: (...args: readonly any[]) => void;
}

interface ScrollEventMap {
    readonly nativeEvent: {
        readonly contentOffset: {
            readonly y: Value<number>,
        },
    };
}

const { height: footerHeight, paddingBottom: footerPaddingBottom }: FooterStyles = getFooterStyles();

const TOTAL_HEADER_HEIGHT: number = HEADER_HEIGHT + Constants.statusBarHeight;

const TOTAL_FOOTER_HEIGHT = footerHeight + footerPaddingBottom;

const FOOTER_ICON_HEIGHT = 30;

const CLAMPED_SCROLL_LOWER_BOUND = 0;

const CLAMPED_SCROLL_UPPER_BOUND = Math.max(TOTAL_HEADER_HEIGHT, TOTAL_FOOTER_HEIGHT);

export const runTiming = (clock: Clock, value: Node<number>, dest: number, resetFlag: Value<number>): Node<number> => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 100,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(
            clockRunning(clock),
            0,
            [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ],
        ),
        timing(clock, state, config),
        cond(state.finished, [stopClock(clock), set(resetFlag, 0)]),
        state.position,
    ]);
};

export const createScrollAnimationContext = (): ScrollAnimationContext => {
    const animatedScrollValueRef = useRef(new Value(0));

    const upwardScrollInterpolatedValue = interpolate(animatedScrollValueRef.current, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: Extrapolate.CLAMP,
    });

    const animatedClampedScrollValueRef = useRef(
        diffClamp(
            upwardScrollInterpolatedValue,
            CLAMPED_SCROLL_LOWER_BOUND,
            CLAMPED_SCROLL_UPPER_BOUND,
        ),
    );

    const animatedHeaderHeight = interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, TOTAL_HEADER_HEIGHT],
        outputRange: [TOTAL_HEADER_HEIGHT, Constants.statusBarHeight],
        extrapolate: Extrapolate.CLAMP,
    });

    const animatedFooterHeight = interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, footerHeight],
        outputRange: [footerHeight, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    const animatedFooterBottomPadding = interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [0, footerPaddingBottom],
        outputRange: [footerPaddingBottom, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    const animatedFooterIconVerticalTranslate = interpolate(animatedClampedScrollValueRef.current, {
        inputRange: [footerPaddingBottom, footerHeight],
        outputRange: [0, footerHeight - FOOTER_ICON_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
    });

    const onAnimatedScrollHandler = useMemo((): (...args: readonly any[]) => void => {
        const eventArgumentMapping: readonly [ScrollEventMap] = [{
            nativeEvent: {
                contentOffset: {
                    y: animatedScrollValueRef.current,
                },
            },
        }];

        const eventConfig =  {
            useNativeDriver: true,
        };

        return event<ScrollEventMap>(eventArgumentMapping, eventConfig);
    }, []);

    return {
        animatedFooterHeight,
        animatedFooterBottomPadding,
        animatedFooterIconVerticalTranslate,
        animatedHeaderHeight,
        onAnimatedScrollHandler,
    };
};

export const ScrollContext = React.createContext<Partial<ScrollAnimationContext>>({});