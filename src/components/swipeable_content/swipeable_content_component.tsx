// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { View, PanResponder, PanResponderInstance, PanResponderGestureState, GestureResponderEvent } from 'react-native';
import * as R from 'ramda';
import { colors } from '../../application/styles';

const swipeSensitivity = 75;

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
    gestureState.dx !== 0 ? true : false
);

type OnPanResponderMoveCallback = (_event: GestureResponderEvent, _gestureState: PanResponderGestureState) => void;

const onPanResponderEnd = (currentIndex: number, itemCount: number, setState: SetState): OnPanResponderMoveCallback => {
    return (_event: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
        if (isRightToLeftSwipe(gestureState.dx)) {
            updateIndexIfChanged(currentIndex, getNextIndex(currentIndex, itemCount), setState);
        } else if (isLeftToRightSwipe(gestureState.dx)) {
            updateIndexIfChanged(currentIndex, getPreviousIndex(currentIndex), setState);
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

const getNextIndex = (currentIndex: number, itemCount: number): number => (
    currentIndex + 1 < itemCount ? currentIndex + 1 : currentIndex
);

const getPreviousIndex = (currentIndex: number): number => (
    currentIndex - 1 >= 0 ? currentIndex - 1 : 0
);

const isRightToLeftSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue < 0 && Math.abs(horizontalMovementValue) > swipeSensitivity
);

const isLeftToRightSwipe = (horizontalMovementValue: number): boolean => (
    horizontalMovementValue > 0 && Math.abs(horizontalMovementValue) > swipeSensitivity
);

const updateIndexIfChanged = (currentIndex: number, newIndex: number, setState: SetState): void => {
    if (currentIndex !== newIndex) {
        setState({ currentIndex: newIndex });
    }
};
