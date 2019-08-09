// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import {
    View,
    PanResponder,
    PanResponderInstance,
    PanResponderGestureState,
    GestureResponderEvent,
    I18nManager,
} from 'react-native';
import * as R from 'ramda';
import { colors } from '../../application/styles';

const requiredSwipDistanceValue = 75;

interface SwipeableContentComponentProps {
    readonly contentItems: ReadonlyArray<JSX.Element>;
}

interface State {
    readonly currentIndex: number;
}

type SetState = React.Dispatch<React.SetStateAction<State>>;

export const SwipeableContentComponent = (props: SwipeableContentComponentProps): JSX.Element => {
    const [state, setState]: [State, SetState] = buildState();
    const itemCount = props.contentItems.length;
    const panResponder = buildPanResponder(state.currentIndex, itemCount, setState);
    return (
        <View {...panResponder.panHandlers} style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            {props.contentItems[state.currentIndex]}
            <NavigationDots currentIndex={state.currentIndex} count={itemCount} />
        </View>
    );
};

const buildState = (): [State, SetState] =>
    useState({
        currentIndex: 0,
    });

const buildPanResponder = (currentIndex: number, itemCount: number, setState: SetState): PanResponderInstance => (
    PanResponder.create({
        onMoveShouldSetPanResponder,
        onPanResponderEnd: onPanResponderEnd(currentIndex, itemCount, setState),
    })
);

const onMoveShouldSetPanResponder = (_event: GestureResponderEvent, gestureState: PanResponderGestureState): boolean => (
    // For 3d touch devices (newer iPhones) we have problems with tappable items not being tappable when nested in the pan responder.
    // See https://github.com/facebook/react-native/issues/3082 for more details.
    // This basically says "your tap must be moving horizontally" in order for us to set the responder.
    gestureState.dx !== 0
);

type OnPanResponderMoveCallback = (_event: GestureResponderEvent, _gestureState: PanResponderGestureState) => void;

const onPanResponderEnd = (currentIndex: number, itemCount: number, setState: SetState): OnPanResponderMoveCallback => {
    return (_event: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
        if (isLeftSwipe(gestureState.dx)) {
            const nextIndex = getNextIndexForLeftSwipe(currentIndex, itemCount);
            setState({ currentIndex: nextIndex });
        } else if (isRightSwipe(gestureState.dx)) {
            const nextIndex = getNextIndexForRightSwipe(currentIndex, itemCount);
            setState({ currentIndex: nextIndex });
        }
    };
};

const NavigationDots = (props: { readonly currentIndex: number, readonly count: number }): JSX.Element => {
    const renderDot = (_: undefined, loopIndex: number): JSX.Element => {
        return <NavigationDot key={loopIndex} currentIndex={props.currentIndex} loopIndex={loopIndex} />;
    };
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {R.range(0, props.count).map(renderDot)}
        </View>
    );
};

const NavigationDot = (props: { readonly currentIndex: number, readonly loopIndex: number}): JSX.Element => {
    const dotSize = 8;
    const dotStyle = { width: dotSize, height: dotSize, borderRadius: dotSize / 2, marginHorizontal: 5 };
    if (props.currentIndex === props.loopIndex) {
        return <View style={{ ...dotStyle, backgroundColor: colors.topaz }} />;
    }
    return <View style={{ ...dotStyle, backgroundColor: colors.lightGrey }} />;
};

const getNextIndexForLeftSwipe = (currentIndex: number, itemCount: number): number => (
    I18nManager.isRTL ? getDecrementedIndex(currentIndex) : getIncrementedIndex(currentIndex, itemCount)
);

const getNextIndexForRightSwipe = (currentIndex: number, itemCount: number): number => (
    I18nManager.isRTL ? getIncrementedIndex(currentIndex, itemCount) : getDecrementedIndex(currentIndex)
);

const getIncrementedIndex = (currentIndex: number, itemCount: number): number => (
    R.min(currentIndex + 1, itemCount - 1)
);

const getDecrementedIndex = (currentIndex: number): number => (
    R.max(currentIndex - 1, 0)
);

const isLeftSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue < -1.0 * requiredSwipDistanceValue
);

const isRightSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue > requiredSwipDistanceValue
);
