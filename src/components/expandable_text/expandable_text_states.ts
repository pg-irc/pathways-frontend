
export enum ExpandableTextStates {
    doesNotCollapse,
    isCollapsed,
    isExpanded,
}

export const defaultExpandableTextState = ExpandableTextStates.doesNotCollapse;

export const isDefaultState = (currentState: ExpandableTextStates): boolean => (
    currentState === defaultExpandableTextState
);

export const shouldShowButton = (currentState: ExpandableTextStates): boolean => (
    currentState === ExpandableTextStates.isCollapsed ||
    currentState === ExpandableTextStates.isExpanded
);

export const toggleExpandedState = (currentState: ExpandableTextStates): ExpandableTextStates => {
    if (isDefaultState(currentState)) {
        return currentState;
    }

    return currentState === ExpandableTextStates.isCollapsed ?
        ExpandableTextStates.isExpanded :
        ExpandableTextStates.isCollapsed;
};
