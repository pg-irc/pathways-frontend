import Constants from 'expo-constants';
// @ts-ignore variables is exported by native base but is not defined by the types file
import { Footer, FooterTab, variables } from 'native-base';
import React, { useMemo } from 'react';
import Animated, {
    Extrapolate,
    Node,
    Value,
    add,
    block,
    cond,
    diffClamp,
    event,
    eq,
    interpolate,
    max,
    multiply,
    set,
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

enum ScrollAnimationState {
    START,
    STOP,
}

enum ToggleOffset {
    ON,
    OFF,
}

enum InterpolationState {
    RUN,
    PAUSE,
}

export interface FooterStyles {
    readonly height: number;
    readonly paddingBottom: number;
}

export interface ScrollAnimationContext {
    readonly animatedSearchHeaderAndFooter: Node<number>;
    readonly animatedFooterHeight: Node<number>;
    readonly animatedFooterBottomPadding: Node<number>;
    readonly animatedFooterIconVerticalTranslate: Node<number>;
    readonly animatedHeaderHeight: Node<number>;
    readonly onAnimatedScrollHandler: (...args: readonly any[]) => void;
    readonly startScrollAnimation: () => void;
    readonly stopScrollAnimation: () => void;
    readonly resetFromInput: () => void;
    readonly runInterpolations: () => void;
    readonly pauseInterpolations: () => void;
}

interface ScrollEventMap {
    readonly nativeEvent: {
        readonly contentOffset: {
            readonly y: (y: number) => Animated.Node<number>,
        },
    };
}

const { height: footerHeight, paddingBottom: footerPaddingBottom }: FooterStyles = getFooterStyles();

const TOTAL_HEADER_HEIGHT: number = HEADER_HEIGHT + Constants.statusBarHeight;

const TOTAL_FOOTER_HEIGHT = footerHeight + footerPaddingBottom;

const FOOTER_ICON_HEIGHT = 30;

const CLAMPED_SCROLL_LOWER_BOUND = 0;

const CLAMPED_SCROLL_UPPER_BOUND = Math.max(TOTAL_HEADER_HEIGHT, TOTAL_FOOTER_HEIGHT);

function initializeValue<T extends number | boolean | string>(initialValue: T): () => Value<T> {
    return (): Value<T> => new Value<T>(initialValue);
}

export const createScrollAnimationContext = (): ScrollAnimationContext => {
    const showOffsetFlag = useMemo(initializeValue<number>(ToggleOffset.OFF), []);
    const showOffsetValue = useMemo(initializeValue<number>(0), []);

    const scrollAnimationState = useMemo(initializeValue<ScrollAnimationState>(ScrollAnimationState.STOP), []);
    const animatedScrollValue = useMemo(initializeValue<number>(0), []);
    const animatedHeaderHeight = useMemo(initializeValue<number>(TOTAL_HEADER_HEIGHT), []);
    const animatedClampedScrollValue = useMemo(initializeValue<number>(0), []);
    const animatedFooterHeight = useMemo(initializeValue<number>(footerHeight), []);
    const animatedFooterBottomPadding = useMemo(initializeValue<number>(footerPaddingBottom), []);
    const animatedFooterIconVerticalTranslate = useMemo(initializeValue<number>(0), []);

    const interpolationToggle = useMemo(initializeValue<number>(InterpolationState.PAUSE), []);

    const onAnimatedScrollHandler = useMemo((): (...args: readonly any[]) => void => {
        const eventArgumentMapping: readonly [ScrollEventMap] = [{
            nativeEvent: {
                contentOffset: {
                    y: (y: number): Node<number> => block([
                        cond(eq(interpolationToggle, InterpolationState.RUN), set(animatedScrollValue, y)),
                    ]),
                },
            },
        }];

        const eventConfig =  {
            useNativeDriver: true,
        };

        return event<ScrollEventMap>(eventArgumentMapping, eventConfig);
    }, []);

    const scrollInterpolations = useMemo((): Node<number> => {
        const updateShowOffset =
            set(
                showOffsetValue,
                add(
                    showOffsetValue,
                    multiply(max(TOTAL_HEADER_HEIGHT, footerHeight + footerPaddingBottom), -1),
                ),
            );

        const turnOffShowOffsetFlag = set(showOffsetFlag, ToggleOffset.OFF);

        const updateOffsetIfToggleIsOn = cond(
            eq(showOffsetFlag, ToggleOffset.ON),
            block([
                updateShowOffset,
                turnOffShowOffsetFlag,
            ]),
        );

        const clampScroll = set(animatedClampedScrollValue,
            diffClamp(
                add(animatedScrollValue, showOffsetValue),
                CLAMPED_SCROLL_LOWER_BOUND,
                CLAMPED_SCROLL_UPPER_BOUND,
            ),
        );

        const interpolateHeaderHeight = set(animatedHeaderHeight, interpolate(animatedClampedScrollValue, {
            inputRange: [0, TOTAL_HEADER_HEIGHT],
            outputRange: [TOTAL_HEADER_HEIGHT, Constants.statusBarHeight],
            extrapolate: Extrapolate.CLAMP,
        }));

        const interpolateFooterHeight = set(animatedFooterHeight, interpolate(animatedClampedScrollValue, {
            inputRange: [0, footerHeight],
            outputRange: [footerHeight, 0],
            extrapolate: Extrapolate.CLAMP,
        }));

        const interpolateFooterPadding = set(animatedFooterBottomPadding, interpolate(animatedClampedScrollValue, {
            inputRange: [0, footerPaddingBottom],
            outputRange: [footerPaddingBottom, 0],
            extrapolate: Extrapolate.CLAMP,
        }));

        const interpolateFooterIconTranslation = set(animatedFooterIconVerticalTranslate, interpolate(animatedClampedScrollValue, {
            inputRange: [footerPaddingBottom, footerHeight],
            outputRange: [0, footerHeight - FOOTER_ICON_HEIGHT],
            extrapolate: Extrapolate.CLAMP,
        }));

        return block([
            updateOffsetIfToggleIsOn,
            clampScroll,
            interpolateHeaderHeight,
            interpolateFooterHeight,
            interpolateFooterPadding,
            interpolateFooterIconTranslation,
        ]);
    }, []);

    const resetValues = useMemo((): Node<number> => (
        block([
            set(animatedScrollValue, 0),
            set(animatedClampedScrollValue, 0),
            set(animatedHeaderHeight, TOTAL_HEADER_HEIGHT),
            set(animatedFooterHeight, footerHeight),
            set(animatedFooterBottomPadding, footerPaddingBottom),
            set(animatedFooterIconVerticalTranslate, 0),
        ])
    ), []);

    const resetFromInput = (): void => {
        // tslint:disable-next-line: no-expression-statement
        showOffsetFlag.setValue(ToggleOffset.ON);
    };

    const startScrollAnimation = (): void => {
        // tslint:disable-next-line: no-expression-statement
        scrollAnimationState.setValue(ScrollAnimationState.START);
    };

    const stopScrollAnimation = (): void => {
        // tslint:disable-next-line: no-expression-statement
        scrollAnimationState.setValue(ScrollAnimationState.STOP);
    };

    const runInterpolations = (): void => {
        // tslint:disable-next-line: no-expression-statement
        interpolationToggle.setValue(InterpolationState.RUN);
    };

    const pauseInterpolations = (): void => {
        // tslint:disable-next-line: no-expression-statement
        interpolationToggle.setValue(InterpolationState.PAUSE);
    };

    const animatedSearchHeaderAndFooter = useMemo((): Node<number> => (
        cond(eq(scrollAnimationState, ScrollAnimationState.START), scrollInterpolations, resetValues)
    ), []);

    return {
        animatedHeaderHeight,
        animatedFooterHeight,
        animatedFooterBottomPadding,
        animatedFooterIconVerticalTranslate,
        animatedSearchHeaderAndFooter,
        onAnimatedScrollHandler,
        pauseInterpolations,
        resetFromInput,
        runInterpolations,
        startScrollAnimation,
        stopScrollAnimation,
    };
};

export const ScrollContext = React.createContext<Partial<ScrollAnimationContext>>({});
